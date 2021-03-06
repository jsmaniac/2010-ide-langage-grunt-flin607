function MBloc() {
    $.extend(this, {
        uid: singleton.uid(),
        
        // Propriétés
        nom: "Nouveau bloc",
        description: '', /* Est une définition ? */
        
        // Parents
        monde: null,
        
        // Enfants
        définitions: [],
        mPortsEntrée: null,
        mPortsSortie: null,
        
        // Instanciation
        instances: [],
        demanderInstance: function() {
            var mib = new MInstanceBloc();
            mib.bloc = this;
            this.instances.push(mib);
            return mib;
        },
        // Modification
        changeNom: function(nouveauNom) {
            this.nom = nouveauNom;
            faireCallbacks(this.cbChangeNom, this);
            faireCallbacks(this.cbModification, this);
        },
        // Ajout
        ajouterDéfinition: function(d) {
            d.bloc = this;
            this.définitions.push(d);
            faireCallbacks(this.cbAjoutDéfinition, d);
            faireCallbacks(this.cbModification, this);
        },
        cbAjoutDéfinition: [],
        onAjoutDéfinition: function(callback) {
            this.cbAjoutDéfinition.push(callback);
        },
        cbChangeNom: [],
        onChangeNom: function(callback) {
            this.cbChangeNom.push(callback);
        },
        cbModification: [],
        onModification: function(callback) {
            this.cbModification.push(callback);
        },
    });
    this.mPortsEntrée = new MPorts(this, true);
    this.mPortsSortie = new MPorts(this, false);
}
