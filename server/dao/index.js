class dao {
    constructor(url) {
        this._url = url;
        // todo: connect to mongo
        this.mongo = this.connect(this._url);
    }

    set url(newUrl) {
        this._url = newUrl;
    }

    connect() {

    }

    disconnect() {

    }

    /**
     * REGISTER MODELS
     * I am not sure if I want to register each model, or new up an instance when needed.
     * Need to think of the api a bit more. How can I make the below api for each model that I have.
     * 
     * CREATE ACTION METHODS FOR EACH MODEL
     * 
     * Dao.Users.create()
     * Dao.Users.read()
     * Dao.Users.update()
     * Dao.Users.delete()
     * 
     * REGISTER ROUTES FOR EACH MODEL
     * Todos.post('', auth, (req, res) => {
     * 
     * });
     * 
     */

}