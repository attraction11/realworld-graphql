const { MongoDataSource } = require('apollo-datasource-mongodb');
// const { _ } = require('../util/helper');

class Articles extends MongoDataSource {
  createArticle(data) {
    const article = new this.model(data);
    // article.populate('author').execPopulate()
    return article.save();
  }

  updateArticle(id, data) {
    const article = this.model.findById(id);
    // article.title = data.title || article.title
    // article.description = data.description || article.description
    // article.body = data.body || article.body
    // Object.assign(article, _.pick(data, ['title', 'description', 'body']));
    // article.populate('author').execPopulate()
    return article.updateOne({ _id: ObjectID(id) }, {
      $set: {
        ...data
      }
    });
  }

  deleteArticle(id) {
    const article = this.model.findById(id);
    return article.deleteOne();
  }

  getArticles(options) {
    return this.model.find().skip(options.offset).limit(options.limit);
  }

  getCount() {
    return this.model.countDocuments();
  }

  getArticle(options) {
    return this.model.findById(options.id);
  }
}

module.exports = Articles;
