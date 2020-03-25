class CoreModel{
    id;
    status;
    created_at;
    updated_at;

    // plutôt que taper plein de paramètres les uns après les autres à chaque instance, on passe juste un objet
    constructor(obj){
        this.id = obj.status;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    //? on ne les utilisera pas ici, mais à savoir: getter et setter
    // les getter et setter ne sont pas obligatoires en js, mais ils nous serviront dans d'autres langages, c'est donc bien de prendre l'habitude de les utiliser
    // ils nous permettent en plus d'ajouter des couches de sécurité (ici par exemple vérifier que id n'est pas null et value est un nombre entier)
    getId(){
        // le getter renvoie la valeur d'une propriété (ici id)
        if(!!this.id){
            return this.id;
        }else{
            return "this object doesn't have any id";
        };
    };

    setId(value){
        // le setter transforme la valeur d'une propriété (ici id)
        if(Number.isInteger(value)){
            return "value must be a number";
        }else{
            this.id = value;
        };
    };
};

module.exports = CoreModel;