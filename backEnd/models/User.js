const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 255] // Mínimo de 6 caracteres para senha
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/ // Validação básica de telefone
        }
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 14], // Permite com ou sem formatação
            isCPF(value) {
                // Validação básica de CPF
                if (!value) return;
                const cleanCPF = value.replace(/\D/g, '');
                if (cleanCPF.length !== 11) {
                    throw new Error('CPF deve ter 11 dígitos');
                }
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'users', // Nome mais convencional para tabelas
    hooks: {
        beforeValidate: (user) => {
            // Limpa formatação do CPF antes de validar
            if (user.cpf) {
                user.cpf = user.cpf.replace(/\D/g, '');
            }
        },
        afterValidate: (user) => {
            // Formata CPF após validação (opcional)
            if (user.cpf && user.cpf.length === 14) {
                user.cpf = user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }
        }
    }
});

module.exports = User;