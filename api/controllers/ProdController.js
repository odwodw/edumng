/**
 * ProdController
 *
 * @description :: Server-side logic for managing prods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
     * 执行跳转主页
     * @param req
     * @param res
     */
    toIndex: function(req,res){
    	
        res.view('index');
    }
};

