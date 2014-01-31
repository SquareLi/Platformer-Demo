package dev.tilemap;
import flambe.animation.AnimatedFloat;
import flambe.asset.AssetPack;
import flambe.display.Texture;
import flambe.input.PointerEvent;
import flambe.math.Point;
import dev.math.Rectangle;
import dev.math.Size;
import flambe.util.Logger;
import haxe.Json;
/**
 * 
 * @author Ang Li(李昂)
 */
class TMXJsonParser
{
	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_LAYER_ATTRIB_NONE : Int = 1 << 0;
	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_LAYER_ATTRIB_BASE64 : Int = 1 << 1;
	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_LAYER_ATTRIB_GZIP : Int = 1 << 2;
	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_LAYER_ATTRIB_ZLIB : Int = 1 << 3;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_NONE : Int = 0;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_MAP : Int = 1;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_LAYER : Int = 2;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_OBJECTGROUP : Int = 3;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_OBJECT : Int = 4;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_PROPERTY_TILE : Int = 5;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_TILE_HORIZONTAL_FLAG : Int = 0x80000000;


	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_TILE_VERTICAL_FLAG : Int = 0x40000000;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_TILE_DIAGONAL_FLAG : Int = 0x20000000;
	
	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_TILE_FLIPPED_ALL : Int = (TMX_TILE_HORIZONTAL_FLAG | TMX_TILE_VERTICAL_FLAG | TMX_TILE_DIAGONAL_FLAG) >>> 0;

	/**
	 * @constant
	 * @type Number
	 */
	public static var TMX_TILE_FLIPPED_MASK : Int = (~(TMX_TILE_FLIPPED_ALL)) >>> 0;
	
	public function new() 
	{
		
	}
	
}

class TMXLayerInfo {
	public var _properties : Map<String, String>;
	public var name : String = "";
	public var _layerSize : Size;
	public var _tiles : Array<Int>;
	public var visible : Bool;
	public var _opacity : Int;
	public var ownTiles : Bool = true;
	public var _minGID : Int = 100000;
	public var _maxGID : Int = 0;
	public var offset : Point;
	public var idx : Int = 0;
	
	public function new() {
		offset = new Point();
		_properties = new Map<String, String>();
		_tiles = new Array<Int>();
	}
	
	public function getProperties() : Map < String, String > {
		return this._properties;
	}
	
	public function setProperties(name : String, value : String ) {
		this._properties.set(name, value);
	}
}

class TMXTilesetInfo {
	public var name : String = "";
	public var firstGid : Int = 0;
	public var lastGid : Int = 0;
	public var _tileSize : Size;
	public var spacing : Float;
	public var margin : Float;
	public var sourceImage : String;
	public var sourceImageWidth : Float;
	public var sourceImageHeight : Float;
	public var imageSize : Size;
	
	public var texture : Texture;
	
	public function new() {
		_tileSize = new Size();
	}
	public function rectForGID(gid : Int) : Rectangle {
		var rect = new Rectangle();
		rect.width = this._tileSize.width;
		rect.height = this._tileSize.height;
		gid = gid - this.firstGid;
		var max_x = (this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing);
		rect.x = (gid % max_x) * (this._tileSize.width + this.spacing) + this.margin;
		
		rect.y = Std.int((gid / max_x)) * (this._tileSize.height + this.spacing) + this.margin;
		return rect;
	}
}

class TMXMapInfo {
	var _orientation : Int;
	var _mapSize : Size;
	var _tileSize : Size;
	var _layers : Array<TMXLayerInfo>;
	var _tileSets : Array<TMXTilesetInfo>;
	var _objectGroups : Array<TMXObjectGroup>;
	var _parentElement : Int;
	var _parentGID : Int;
	var _layerAttribs : Int;
	var _storingCharacters : Bool = false;
	var _properties : Array<Map<String, String>>;
	
	var _TMXFileName : String;
	var _currentString : String;
	var _tileProperties : Map < Int, Map < String, String >> ;
	var _resources : String;
	
	var pack : AssetPack;
	var idx : Int  = 0;
	
	private function new(pack : AssetPack) {
		this._tileProperties = new Map < Int, Map < String, String >> ();
		this._properties = new Array < Map < String, String >> ();
		this.pack = pack;
	}
	
	public function getOrientation() :Int {
		return this._orientation;
	}
	
	public function setOrientation(v : Int) {
		this._orientation = v;
	}
	
	public function getMapSize() : Size {
		return this._mapSize;
	}
	
	public function setMapSize(v : Size) {
		this._mapSize = v;
	}
	
	public function getTileSize() : Size {
		return this._tileSize;
	}
	
	public function setTileSize(v : Size) {
		this._tileSize = v;
	}
	
	public function getLayers() : Array<TMXLayerInfo> {
		return this._layers;
	}
	
	public function setLayers(v : TMXLayerInfo) {
		this._layers.push(v);
	}
	
	public function getTilesets() : Array<TMXTilesetInfo> {
		return this._tileSets;
	}
	
	public function setTilesets(v : TMXTilesetInfo) {
		this._tileSets.push(v);
	}
	
	public function getObjectGroups() : Array<TMXObjectGroup> {
		return this._objectGroups;
	}
	
	public function setObjectGroups(v : TMXObjectGroup) {
		this._objectGroups.push(v);
	}
	
	//public function getParentElement : Int {
	//public function getParentElement : Int {
		//return this._parentElement;
	//}
	//
	//public function setParentElement(v : Int) {
		//this._parentElement = v;
	//}
	
	public function getParentGID() : Int {
		return this._parentGID;
	}
	
	public function setParentGID(v : Int) {
		this._parentGID = v;
	}
	
	public function getLayerAttribs() : Int {
		return this._layerAttribs;
	}
	
	public function setLayerAttribs(v : Int) {
		this._layerAttribs = v;
	}
	
	public function getStoringCharacters() : Bool {
		return this._storingCharacters;
	}
	
	public function setStoringCharacters(v : Bool) {
		this._storingCharacters = v;
	}
	
	public function getProperties() : Array < Map < String, String >> {
		return this._properties;
	}
	
	public function setProperties(v : Map < String, String > ) {
		this._properties.push(v);
	}
	
	public function initWithTMXFile(tmxFile : String, resourcePath : String) {
		this._initernalInit(tmxFile, resourcePath);
		return this.parseXMLFile(this._TMXFileName);
	}
	
	
	
	
	public function getTileProperties(): Map<Int, Map<String, String>>{
		return this._tileProperties;
	}
	public function setTileProperties() {
		
	}
	
	public function getCurrentString() : String {
		return this._currentString;
	}

	public function setCurrentString(currentString : String) {
		this._currentString = currentString;
	}
	
	public function setTMXFileName(fileName : String) {
		this._TMXFileName = fileName;
		
	}
	
	public function _initernalInit(tmxFileName, resourcePath) {
		this._tileSets = new Array<TMXTilesetInfo>();
		this._layers = new Array<TMXLayerInfo>();
		
		this._TMXFileName = tmxFileName;
		
		if (resourcePath != null) {
			this._resources = resourcePath;
		}
		
		this._objectGroups = new Array<TMXObjectGroup>();
		
		this._currentString = "";
		this._storingCharacters = false;
		this._layerAttribs = TMXXMLParser.TMX_LAYER_ATTRIB_NONE;
		this._parentElement = TMXXMLParser.TMX_PROPERTY_NONE;
	}
	
	/**
	 * https://github.com/po8rewq/HaxeFlixelTiled/blob/master/org/flixel/tmx/TmxLayer.hx
	 * @param	input
	 * @return
	 */
	public static function csvToArray(input:String):Array<Int>
	{
		var result:Array<Int> = new Array<Int>();
		var rows:Array<String> = input.split("\n");
		var row:String;
		for (row in rows)
		{
			if (row == "") continue;
			var resultRow:Array<Int> = new Array<Int>();
			var entries:Array<String> = row.split(",");
			//trace(entries);
			var entry:String;
			for (entry in entries) {
				var t = Std.parseInt(entry);
				if (t != null) {
					result.push(t); //convert to int
				}
			}
			

		}
		
		//trace(result);
		return result;
	}
	
	public static function create(pack : AssetPack, tmxFile : String, ?resourcePath : String) : TMXMapInfo {
		var ret : TMXMapInfo = new TMXMapInfo(pack);
		ret.initWithTMXFile(tmxFile, resourcePath);
		
		return ret;
	}
}