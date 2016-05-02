var path = require("path");
var webpack =require("webpack");

var entries = getEntry('src/scripts/page/*.js', 'src/scripts/page/');

module.exports = {
	entry: entries,
	plugins:[
		new webpack.optimize.UglifyJsPlugin(),//压缩js
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery",
	        "window.jQuery": "jquery"
	    }),
	],
	output:{
		path:path.join(__dirname,'dist'),//打包到哪个路径下
		publicPath:'/dist/',//从哪个url下获取bundle出来的js
		filename:'[name].bundle.js',//name对应entry的key
	},
	module:{
		loaders:[
		{
			test:/\.less$/,
			loader:'style!css!less'
		},
		{
			test: /icons/, 
			loader: 'url',
			query:{
				limit:10000
			}
		},
		{
			test:/\.(jpe?g|png|gif|svg)$/,
			loader:'file?name=[name].[ext]!img'
		},
		],
	},
	devtool: "source-map",
}

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}