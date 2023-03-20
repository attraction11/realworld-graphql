module.exports = {
  Query: {
    async articles(parent, { offset, limit }, { dataSources }) {
      // return {}
      const [articles, articlesCount] = await Promise.all([
        dataSources.articles.getArticles({
          offset,
          limit
        }),
        dataSources.articles.getCount()
      ])
      return {
        articles,
        articlesCount
      }
    },
    async article(parent, { id }, { dataSources }) {
      const article = await dataSources.articles.getArticle({
        id
      })
      return article
    }
  },
  Mutation: {
    async createArticle(parent, { article }, { dataSources, user }) {
      article.author = user._id
      const ret = await dataSources.articles.createArticle(article)
      // 根据 用户 ID 获取用户信息填充到 article.author 中      
      return {
        article: ret
      }
    },
    async updateArticle(parent, { id, article }, { dataSources, user }) {
      article.author = user._id
      const ret = await dataSources.articles.updateArticle(id, article)
      // 根据 用户 ID 获取用户信息填充到 article.author 中      
      return {
        article: ret
      }
    },
    async deleteArticle(parent, { id }, { dataSources }) {
      const ret = await dataSources.articles.deleteArticle(id)
      // 根据 用户 ID 获取用户信息填充到 article.author 中      
      return { article: ret }
    }
  },
  Article: {
    async author(parent, args, { dataSources }) {
      const user = await dataSources.users.findById(parent.author)
      return user
    }
  },
  // 使用resolver链无效
  // ArticlesPayload: {
  //   async articles (parent, { offset, limit }, { dataSources }) {
  //     console.log('offset, limit: ', offset, limit);
  //     const articles = await dataSources.articles.getArticles({
  //       offset,
  //       limit
  //     })
  //     return articles
  //   },
  //   async articlesCount (parent, args, { dataSources }) {
  //     const count = await dataSources.articles.getCount()
  //     return count
  //   }
  // }
}
