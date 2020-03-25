class CoreModel{
    id;
    created_at;
    updated_at;

    getId(){
        return this.id;
    };

    setId(value){
        this.id = value;
    };

    getCreatedAt(){
        return this.created_at;
    };

    setCreatedAt(value){
        this.created_at = value;
    };

    getUpdatedAt(){
        return this.updated_at;
    };

    setUpdatedAt(value){
        this.updated_at = value;
    };
};

module.exports = CoreModel;