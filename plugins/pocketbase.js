import { defineNuxtPlugin } from '#app'
import PocketBase from 'pocketbase'

const pocketbase = new PocketBase('https://podular.pockethost.io')

const defaults = {
  // prettier-ignore
  avatar: 'https://turtle-commerce.pockethost.io/api/files/oqyn1qmsatdm53w/th69qz07n9gsddr/avatar_DW57vH1BP3.png?token=',
  // prettier-ignore
  media: 'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/e4gtby5inkjf1fj/slide_16_9_1_p9RTeoLf4l.png?token=',
  // prettier-ignore
  logo: 'https://docket.pockethost.io/api/files/h5nhi1lcdhctt12/vl5isme5dsm0rij/logo_square_Hmcv8zYZse.png?token=',
}

const organization = async () => pb.get('organizations', { id: pocketbase.authStore.model.organization })

const user = async () => {
  try {
    return {
      ...pocketbase.authStore.model,
      avatarUrl: await pb.getAvatarUrl(),
    }
  } catch (err) {
    console.error('Failed to fetch user details:', err)
    return null
  }
}

const channels = async () => {
  try {
    const results = await pocketbase.collection('channels').getList(1, 50, {
      filter: `organization = ${pb.authStore.model.organization}`,
    })
    console.log('Channels:', results)
    return results
  } catch (err) {
    console.error('Failed to fetch channels:', err)
    return null
  }
}

const pb = {
  api: pocketbase,

  user,
  organization,
  channels,

  get: async (collection, params, batchSize) => {
    let record = pocketbase.collection(collection)
    if (params?.id) {
      return record
        .getOne(params.id, { $autoCancel: false })
        .then(data => {
          return data
        })
        .catch(err => {
          global.toast('error', 'Error fetching records')
        })
    } else {
      return record
        .getFullList(batchSize || 200, {
          ...params,
          $autoCancel: false,
        })
        .then(data => {
          return data
        })
    }
  },

  post: async (collection, data, params) => {
    const formData = new FormData()
    Object.entries(data).forEach(entry => formData.append(entry[0], entry[1]))
    return await pocketbase.collection(collection).create(formData, {
      ...params,
      $autoCancel: false,
    })
  },

  update: async (collection, id, data, params) => {
    return await pocketbase.collection(collection).update(id, data, {
      ...params,
      $autoCancel: false,
    })
  },

  delete: async (collection, id) => {
    return await pocketbase.collection(collection).delete(id)
  },

  subscribe: async (collection, id, callback) => {
    return await pocketbase.collection(collection).subscribe(id ?? '*', callback)
  },

  unsubscribe: async collection => {
    return await pocketbase.collection(collection).unsubscribe()
  },

  signup: async payload => {
    const form = new FormData()
    Object.entries(payload).forEach(entry => form.append(entry[0], entry[1]))
    return await pocketbase.collection('users').create(form)
  },

  login: async payload => await pocketbase.collection('users').authWithPassword(payload.email, payload.password),

  logout: () => pocketbase.authStore.clear(),

  getAvatarUrl: async () => {
    const model = pocketbase.authStore.model
    const record = await pocketbase.collection('users').getOne(model?.id, { $autoCancel: false })
    if (model?.id) {
      return await pocketbase.getFileUrl(record, model?.avatar)
    }
    return defaults.avatar
  },

  getLogoUrl: async () => {
    const model = pocketbase.authStore.model
    const record = await pocketbase.collection('organizations').getOne(model.organization, { $autoCancel: false })
    if (record?.logo) {
      return await pocketbase.getFileUrl(record, record.logo)
    }
    return defaults.logo
  },

  getMedialUrl: async id => {
    const record = await pocketbase.collection('media').getOne(id, { $autoCancel: false })
    if (record?.file) {
      return await pocketbase.getFileUrl(record, record.file)
    }
    return defaults.media
  },
}

export { pb }
export default defineNuxtPlugin(nuxtApp => ({ provide: { pb } }))
