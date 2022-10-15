export const actions = {
  async imageUpload(_, payload) {
    const url = this.$config.cloudinaryUrl
    const response = await fetch(url, {
      method: 'POST',
      body: payload,
    })

    return await response.json()
  },

  async deleteCloudinaryImage(_, publicId) {
    try {
      const response = await this.$axios.delete(`/utilities/images/${publicId}`)
      return response
    } catch (error) {
      this.$errorHandler(error)
    }
  },
}
