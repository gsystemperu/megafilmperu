Ext.setGlyphFontFamily('FontAwesome');
Ext.require('megafilmperu.util.Glyphs');
Ext.require('megafilmperu.util.Api');
/*Ext.Loader.setConfig({
  enabled:true,
  paths:{
      'gsperu':'./util'
  }
});*/


Ext.application(
{
    name: 'megafilmperu',
    extend: 'megafilmperu.Application'

});
