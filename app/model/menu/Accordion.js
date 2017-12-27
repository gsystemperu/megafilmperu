Ext.define('megafilmperu.model.menu.Accordion', {
    extend: 'Ext.data.Model',
    requires: [
       'megafilmperu.model.menu.TreeNode'
   ],
   fields: [
       { name: 'id', type: 'int'},
       { name: 'text' },
       { name: 'iconCls' }
   ],
   hasMany: {
       model: 'megafilmperu.model.menu.TreeNode',
       foreignKey: 'parent_id',
       name: 'items'
   }
});
