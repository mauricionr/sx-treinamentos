(function(Vue, pnp){
	
	pnp.setup({
		headers:{
			Accept:'application/json; odata=verbose'
		}
	})
	
	var message = Vue.extend({
		props:['msg'],
		template:`
			<div>
				<p>Hello world {{msg}}</p>
			</div>
		`
	})
	var list = Vue.extend({
		props:['title'],
		data:function(){
			return {
				items:null
			}
		},
		created:function(){
			this.getListItems()
				.then(function(items){
					Vue.set(this, 'items', items)
				}.bind(this))
		},
		methods:{
			getListItems:function(){
				return pnp.sp.web.lists.getByTitle(this.title).items.get()
			}
		},
		template:`
			<ul>
				<li v-for="item in items">{{item.Title}}</li>
			</ul>
		`
	})
	new Vue({
		el:'#root-app',
		components:{
			'message': message,
			'list': list
		},
		template:`
			<section>
				<message msg="com VueJS"></message>
				<list title="_NavegacaoGlobal"></list>
			</section>
		`
	})
})(Vue, $pnp)