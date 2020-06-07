module.exports = function(sequelize, DataTypes) {
    var request = sequelize.define("request", {
      // The email cannot be null, and must be a proper email before creation
        reqId:{
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          unique:true,
          primaryKey:true
        },
        requestDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        requiredDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        requiredDropOffTimeStart: {
            type: DataTypes.TIME,
            allowNull: false
        },
        requiredDropOffTimeEnd: {
            type: DataTypes.TIME,
            allowNull: false
        },
        requiredPickupLocnId: {
            //FK to locations
            type: DataTypes.STRING, // changed to string to simplify
            allowNull:false 
        },
        requiredDropoffLocnId: {
            //FK to locations
            type: DataTypes.STRING, // changed to string to simplify
            allowNull:false 
        },
        addedRouteDistance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:true 
        },
        addedRouteTime: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:true 
        },
        boostersRequired: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        carSeatsRequired: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        creditsOffered: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        booked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
        
        bookedBy:{
            type:DataTypes.STRING,
            defaultValue:false,
        },

        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    });
    request.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        request.belongsTo(models.member);
        request.hasMany(models.reqpassenger);
        
      };
    return request;
  };