var mongoose = require('mongoose');
const response = require('../util/responses');
const User = mongoose.model('User');
const thingService = require('../things/thing.service');

//save
exports.post = async (user, callback) => {
    var user = new User(user); //criando um usuario
    await user.save().then((result) => {
        callback(response.created('Usuário Criado com Sucesso!', result));
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
}

//busca
exports.getById = async (id, callback) => {
    await User.findById({_id: id}).then((result) => {
        callback(response.ok('Busca concluída com Sucesso', result));
    }).catch((err) => {
        callback(response.notFound('Usuário não encontrado'));
    });;
    
}

//pegando os item de cada usuario
exports.getItemByUser = async (userId, callback) => {

    let borrewed = await User.findById({_id: mongoose.Types.ObjectId(userId)})
    .select('borrewed')
    .populate('borrewed');
    
    if (borrewed.borrewed) {
        callback(response.ok('Busca concluida', borrewed.borrewed));
    } else {
        callback(response.notFound("Usuário não Existe!"));
    }
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInBorrewed = async (userId, itemId, callback) => {
    //encontra e atualiza
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {borrewed: [itemId] }})
    .then((result) => {
        callback(response.ok('Item Adicionado! (Lista de Emprestados)', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível Adicionar Item'));
    });
};

//adicionando na lista do usuario um item que foi emprestado
exports.addItemInReturned = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $push: {returned: [itemId] }})
    .then((result) => {
        callback(response.ok('ADICIONADO AOS DEVOLVIDOS!', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possível devolver o Item'));
    });
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInBorrewed = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {borrewed: mongoose.Types.ObjectId(itemId) }})
    .then(() => {
        callback(response.ok("Item Removido da Lista de Emprestados!", ''));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item'));
    });
    // await thingService.removeItem(itemId);
};

//removendo da lista do usuario um item que foi emprestado, ou seja, foi devolvido. 
exports.removeItemInReturned = async (userId, itemId, callback) => {
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { $pull: {returned: mongoose.Types.ObjectId(itemId) }})
    .then(() => {
        callback(response.ok("Item Removido da Lista de Devolvidos!", ''));    
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel remover o item'));
    });
    await thingService.removeItem(itemId);
};
