const { DataTypes } = require('sequelize');
const { db } = require('../connection');

const Mamovsar = db.define('mamovsar', {
    aud_esta: { type: DataTypes.STRING }, // estado auditoria
    aud_usua: { type: DataTypes.STRING }, // usuario auditoria
    aud_fech: { type: DataTypes.DATE }, // fecha auditoria
    emp_codi: { type: DataTypes.INTEGER }, // codigo empresa
    codmaq: { type: DataTypes.STRING }, // codigo maquina
    nommaq: { type: DataTypes.STRING }, // nombre maquina
    sar_vtoc: { type: DataTypes.NUMBER }, // valor toc
    sar_utoc: { type: DataTypes.STRING }, // und toco
    sar_vaic: { type: DataTypes.NUMBER }, // valor iv
    sar_unic: { type: DataTypes.STRING }, // unidad ic
    sar_vatc: { type: DataTypes.NUMBER }, // valor tc
    sar_untc: { type: DataTypes.STRING }, // unidad tc
    sar_cocr: { type: DataTypes.NUMBER }, // valor conductividad cruda
    sar_ucoc: { type: DataTypes.STRING }, // unidad conductividad cruda
    sar_vcon: { type: DataTypes.NUMBER }, // valor conductividad 
    sar_ucon: { type: DataTypes.STRING }, // unidad conductividad
    sar_vtem: { type: DataTypes.NUMBER }, // valor temperatura muestra
    sar_utem: { type: DataTypes.STRING }, // unidad temperatura muestra
    sar_acon: { type: DataTypes.BOOLEAN }, // alarma conductividad
    sar_atoc: { type: DataTypes.BOOLEAN }, // alarma toc

},
{
    freezeTableName: true,
    timestamps: false,
    id: false, 
}
)

Mamovsar.sync()
    .then(()=>{
        console.log('tabla Mamovsar sincronizada');
    })
    .catch((error)=>{
        console.error('Mamovsar error:', error);
    });

module.exports = Mamovsar;