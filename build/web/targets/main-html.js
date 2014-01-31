(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(js.Boot.isClass(f) || js.Boot.isEnum(f));
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEof = function(c) {
	return c != c;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !js.Boot.isClass(cl)) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !js.Boot.isEnum(e)) return null;
	return e;
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : true, __constructs__ : [] }
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = true;
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
}
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
var box2D = {}
box2D.collision = {}
box2D.collision.B2AABB = function() {
	this.lowerBound = new box2D.common.math.B2Vec2();
	this.upperBound = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.collision.B2AABB"] = box2D.collision.B2AABB;
box2D.collision.B2AABB.__name__ = true;
box2D.collision.B2AABB.prototype = {
	combine: function(aabb1,aabb2) {
		this.lowerBound.x = Math.min(aabb1.lowerBound.x,aabb2.lowerBound.x);
		this.lowerBound.y = Math.min(aabb1.lowerBound.y,aabb2.lowerBound.y);
		this.upperBound.x = Math.max(aabb1.upperBound.x,aabb2.upperBound.x);
		this.upperBound.y = Math.max(aabb1.upperBound.y,aabb2.upperBound.y);
	}
	,testOverlap: function(other) {
		var d1X = other.lowerBound.x - this.upperBound.x;
		var d1Y = other.lowerBound.y - this.upperBound.y;
		var d2X = this.lowerBound.x - other.upperBound.x;
		var d2Y = this.lowerBound.y - other.upperBound.y;
		if(d1X > 0.0 || d1Y > 0.0) return false;
		if(d2X > 0.0 || d2Y > 0.0) return false;
		return true;
	}
	,contains: function(aabb) {
		var result = true;
		result = result && this.lowerBound.x <= aabb.lowerBound.x;
		result = result && this.lowerBound.y <= aabb.lowerBound.y;
		result = result && aabb.upperBound.x <= this.upperBound.x;
		result = result && aabb.upperBound.y <= this.upperBound.y;
		return result;
	}
	,getCenter: function() {
		return new box2D.common.math.B2Vec2((this.lowerBound.x + this.upperBound.x) / 2,(this.lowerBound.y + this.upperBound.y) / 2);
	}
	,__class__: box2D.collision.B2AABB
}
box2D.common = {}
box2D.common.math = {}
box2D.common.math.B2Vec2 = function(x_,y_) {
	if(y_ == null) y_ = 0;
	if(x_ == null) x_ = 0;
	this.x = x_;
	this.y = y_;
};
$hxClasses["box2D.common.math.B2Vec2"] = box2D.common.math.B2Vec2;
box2D.common.math.B2Vec2.__name__ = true;
box2D.common.math.B2Vec2.make = function(x_,y_) {
	return new box2D.common.math.B2Vec2(x_,y_);
}
box2D.common.math.B2Vec2.prototype = {
	normalize: function() {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		if(length < box2D.common.math.B2Math.get_MIN_VALUE()) return 0.0;
		var invLength = 1.0 / length;
		this.x *= invLength;
		this.y *= invLength;
		return length;
	}
	,lengthSquared: function() {
		return this.x * this.x + this.y * this.y;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,multiply: function(a) {
		this.x *= a;
		this.y *= a;
	}
	,add: function(v) {
		this.x += v.x;
		this.y += v.y;
	}
	,copy: function() {
		return new box2D.common.math.B2Vec2(this.x,this.y);
	}
	,negativeSelf: function() {
		this.x = -this.x;
		this.y = -this.y;
	}
	,getNegative: function() {
		return new box2D.common.math.B2Vec2(-this.x,-this.y);
	}
	,setV: function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	,set: function(x_,y_) {
		if(y_ == null) y_ = 0;
		if(x_ == null) x_ = 0;
		this.x = x_;
		this.y = y_;
	}
	,setZero: function() {
		this.x = 0.0;
		this.y = 0.0;
	}
	,__class__: box2D.common.math.B2Vec2
}
box2D.collision.ClipVertex = function() {
	this.v = new box2D.common.math.B2Vec2();
	this.id = new box2D.collision.B2ContactID();
};
$hxClasses["box2D.collision.ClipVertex"] = box2D.collision.ClipVertex;
box2D.collision.ClipVertex.__name__ = true;
box2D.collision.ClipVertex.prototype = {
	set: function(other) {
		this.v.setV(other.v);
		this.id.set(other.id);
	}
	,__class__: box2D.collision.ClipVertex
}
box2D.collision.B2ContactID = function() {
	this.features = new box2D.collision.Features();
	this.features._m_id = this;
};
$hxClasses["box2D.collision.B2ContactID"] = box2D.collision.B2ContactID;
box2D.collision.B2ContactID.__name__ = true;
box2D.collision.B2ContactID.prototype = {
	set_key: function(value) {
		this._key = value;
		this.features._referenceEdge = this._key & 255;
		this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
		this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
		this.features._flip = (this._key & -16777216) >> 24 & 255;
		return this._key;
	}
	,get_key: function() {
		return this._key;
	}
	,set: function(id) {
		this.set_key(id._key);
	}
	,__class__: box2D.collision.B2ContactID
}
box2D.collision.Features = function() {
};
$hxClasses["box2D.collision.Features"] = box2D.collision.Features;
box2D.collision.Features.__name__ = true;
box2D.collision.Features.prototype = {
	set_flip: function(value) {
		this._flip = value;
		this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & -16777216;
		return value;
	}
	,set_incidentVertex: function(value) {
		this._incidentVertex = value;
		this._m_id._key = this._m_id._key & -16711681 | this._incidentVertex << 16 & 16711680;
		return value;
	}
	,set_incidentEdge: function(value) {
		this._incidentEdge = value;
		this._m_id._key = this._m_id._key & -65281 | this._incidentEdge << 8 & 65280;
		return value;
	}
	,set_referenceEdge: function(value) {
		this._referenceEdge = value;
		this._m_id._key = this._m_id._key & -256 | this._referenceEdge & 255;
		return value;
	}
	,__class__: box2D.collision.Features
}
box2D.collision.B2Collision = function() { }
$hxClasses["box2D.collision.B2Collision"] = box2D.collision.B2Collision;
box2D.collision.B2Collision.__name__ = true;
box2D.collision.B2Collision.clipSegmentToLine = function(vOut,vIn,normal,offset) {
	var cv;
	var numOut = 0;
	cv = vIn[0];
	var vIn0 = cv.v;
	cv = vIn[1];
	var vIn1 = cv.v;
	var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
	var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
	if(distance0 <= 0.0) vOut[numOut++].set(vIn[0]);
	if(distance1 <= 0.0) vOut[numOut++].set(vIn[1]);
	if(distance0 * distance1 < 0.0) {
		var interp = distance0 / (distance0 - distance1);
		cv = vOut[numOut];
		var tVec = cv.v;
		tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
		tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
		cv = vOut[numOut];
		var cv2;
		if(distance0 > 0.0) {
			cv2 = vIn[0];
			cv.id = cv2.id;
		} else {
			cv2 = vIn[1];
			cv.id = cv2.id;
		}
		++numOut;
	}
	return numOut;
}
box2D.collision.B2Collision.edgeSeparation = function(poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
	var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
	var index = 0;
	var minDot = box2D.common.math.B2Math.get_MAX_VALUE();
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = vertices2[i];
		var dot = tVec.x * normal1X + tVec.y * normal1Y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	tVec = vertices1[edge1];
	tMat = xf1.R;
	var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tVec = vertices2[index];
	tMat = xf2.R;
	var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	v2X -= v1X;
	v2Y -= v1Y;
	var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
	return separation;
}
box2D.collision.B2Collision.findMaxSeparation = function(edgeIndex,poly1,xf1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = poly2.m_centroid;
	var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf1.R;
	tVec = poly1.m_centroid;
	dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
	var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
	var edge = 0;
	var maxDot = -box2D.common.math.B2Math.get_MAX_VALUE();
	var _g = 0;
	while(_g < count1) {
		var i = _g++;
		tVec = normals1[i];
		var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
		if(dot > maxDot) {
			maxDot = dot;
			edge = i;
		}
	}
	var s = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,edge,poly2,xf2);
	var prevEdge = edge - 1 >= 0?edge - 1:count1 - 1;
	var sPrev = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,prevEdge,poly2,xf2);
	var nextEdge = edge + 1 < count1?edge + 1:0;
	var sNext = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,nextEdge,poly2,xf2);
	var bestEdge;
	var bestSeparation;
	var increment;
	if(sPrev > s && sPrev > sNext) {
		increment = -1;
		bestEdge = prevEdge;
		bestSeparation = sPrev;
	} else if(sNext > s) {
		increment = 1;
		bestEdge = nextEdge;
		bestSeparation = sNext;
	} else {
		edgeIndex[0] = edge;
		return s;
	}
	while(true) {
		if(increment == -1) edge = bestEdge - 1 >= 0?bestEdge - 1:count1 - 1; else edge = bestEdge + 1 < count1?bestEdge + 1:0;
		s = box2D.collision.B2Collision.edgeSeparation(poly1,xf1,edge,poly2,xf2);
		if(s > bestSeparation) {
			bestEdge = edge;
			bestSeparation = s;
		} else break;
	}
	edgeIndex[0] = bestEdge;
	return bestSeparation;
}
box2D.collision.B2Collision.findIncidentEdge = function(c,poly1,xf1,edge1,poly2,xf2) {
	var count1 = poly1.m_vertexCount;
	var normals1 = poly1.m_normals;
	var count2 = poly2.m_vertexCount;
	var vertices2 = poly2.m_vertices;
	var normals2 = poly2.m_normals;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = normals1[edge1];
	var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	tMat = xf2.R;
	var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
	normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
	normal1X = tX;
	var index = 0;
	var minDot = box2D.common.math.B2Math.get_MAX_VALUE();
	var _g = 0;
	while(_g < count2) {
		var i = _g++;
		tVec = normals2[i];
		var dot = normal1X * tVec.x + normal1Y * tVec.y;
		if(dot < minDot) {
			minDot = dot;
			index = i;
		}
	}
	var tClip;
	var i1 = index;
	var i2 = i1 + 1 < count2?i1 + 1:0;
	tClip = c[0];
	tVec = vertices2[i1];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.set_referenceEdge(edge1);
	tClip.id.features.set_incidentEdge(i1);
	tClip.id.features.set_incidentVertex(0);
	tClip = c[1];
	tVec = vertices2[i2];
	tMat = xf2.R;
	tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tClip.id.features.set_referenceEdge(edge1);
	tClip.id.features.set_incidentEdge(i2);
	tClip.id.features.set_incidentVertex(1);
}
box2D.collision.B2Collision.makeClipPointVector = function() {
	var r = new Array();
	r[0] = new box2D.collision.ClipVertex();
	r[1] = new box2D.collision.ClipVertex();
	return r;
}
box2D.collision.B2Collision.collidePolygons = function(manifold,polyA,xfA,polyB,xfB) {
	var cv;
	manifold.m_pointCount = 0;
	var totalRadius = polyA.m_radius + polyB.m_radius;
	var edgeA = 0;
	box2D.collision.B2Collision.s_edgeAO[0] = edgeA;
	var separationA = box2D.collision.B2Collision.findMaxSeparation(box2D.collision.B2Collision.s_edgeAO,polyA,xfA,polyB,xfB);
	edgeA = box2D.collision.B2Collision.s_edgeAO[0];
	if(separationA > totalRadius) return;
	var edgeB = 0;
	box2D.collision.B2Collision.s_edgeBO[0] = edgeB;
	var separationB = box2D.collision.B2Collision.findMaxSeparation(box2D.collision.B2Collision.s_edgeBO,polyB,xfB,polyA,xfA);
	edgeB = box2D.collision.B2Collision.s_edgeBO[0];
	if(separationB > totalRadius) return;
	var poly1;
	var poly2;
	var xf1;
	var xf2;
	var edge1;
	var flip;
	var k_relativeTol = 0.98;
	var k_absoluteTol = 0.001;
	var tMat;
	if(separationB > k_relativeTol * separationA + k_absoluteTol) {
		poly1 = polyB;
		poly2 = polyA;
		xf1 = xfB;
		xf2 = xfA;
		edge1 = edgeB;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_B;
		flip = 1;
	} else {
		poly1 = polyA;
		poly2 = polyB;
		xf1 = xfA;
		xf2 = xfB;
		edge1 = edgeA;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_A;
		flip = 0;
	}
	var incidentEdge = box2D.collision.B2Collision.s_incidentEdge;
	box2D.collision.B2Collision.findIncidentEdge(incidentEdge,poly1,xf1,edge1,poly2,xf2);
	var count1 = poly1.m_vertexCount;
	var vertices1 = poly1.m_vertices;
	var local_v11 = vertices1[edge1];
	var local_v12;
	if(edge1 + 1 < count1) local_v12 = vertices1[Std["int"](edge1 + 1)]; else local_v12 = vertices1[0];
	var localTangent = box2D.collision.B2Collision.s_localTangent;
	localTangent.set(local_v12.x - local_v11.x,local_v12.y - local_v11.y);
	localTangent.normalize();
	var localNormal = box2D.collision.B2Collision.s_localNormal;
	localNormal.x = localTangent.y;
	localNormal.y = -localTangent.x;
	var planePoint = box2D.collision.B2Collision.s_planePoint;
	planePoint.set(0.5 * (local_v11.x + local_v12.x),0.5 * (local_v11.y + local_v12.y));
	var tangent = box2D.collision.B2Collision.s_tangent;
	tMat = xf1.R;
	tangent.x = tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y;
	tangent.y = tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y;
	var tangent2 = box2D.collision.B2Collision.s_tangent2;
	tangent2.x = -tangent.x;
	tangent2.y = -tangent.y;
	var normal = box2D.collision.B2Collision.s_normal;
	normal.x = tangent.y;
	normal.y = -tangent.x;
	var v11 = box2D.collision.B2Collision.s_v11;
	var v12 = box2D.collision.B2Collision.s_v12;
	v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
	v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
	v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
	v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
	var frontOffset = normal.x * v11.x + normal.y * v11.y;
	var sideOffset1 = -tangent.x * v11.x - tangent.y * v11.y + totalRadius;
	var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
	var clipPoints1 = box2D.collision.B2Collision.s_clipPoints1;
	var clipPoints2 = box2D.collision.B2Collision.s_clipPoints2;
	var np;
	np = box2D.collision.B2Collision.clipSegmentToLine(clipPoints1,incidentEdge,tangent2,sideOffset1);
	if(np < 2) return;
	np = box2D.collision.B2Collision.clipSegmentToLine(clipPoints2,clipPoints1,tangent,sideOffset2);
	if(np < 2) return;
	manifold.m_localPlaneNormal.setV(localNormal);
	manifold.m_localPoint.setV(planePoint);
	var pointCount = 0;
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		cv = clipPoints2[i];
		var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
		if(separation <= totalRadius) {
			var cp = manifold.m_points[pointCount];
			tMat = xf2.R;
			var tX = cv.v.x - xf2.position.x;
			var tY = cv.v.y - xf2.position.y;
			cp.m_localPoint.x = tX * tMat.col1.x + tY * tMat.col1.y;
			cp.m_localPoint.y = tX * tMat.col2.x + tY * tMat.col2.y;
			cp.m_id.set(cv.id);
			cp.m_id.features.set_flip(flip);
			++pointCount;
		}
	}
	manifold.m_pointCount = pointCount;
}
box2D.collision.B2Collision.collideCircles = function(manifold,circle1,xf1,circle2,xf2) {
	manifold.m_pointCount = 0;
	var tMat;
	var tVec;
	tMat = xf1.R;
	tVec = circle1.m_p;
	var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	tMat = xf2.R;
	tVec = circle2.m_p;
	var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	var dX = p2X - p1X;
	var dY = p2Y - p1Y;
	var distSqr = dX * dX + dY * dY;
	var radius = circle1.m_radius + circle2.m_radius;
	if(distSqr > radius * radius) return;
	manifold.m_type = box2D.collision.B2ManifoldType.CIRCLES;
	manifold.m_localPoint.setV(circle1.m_p);
	manifold.m_localPlaneNormal.setZero();
	manifold.m_pointCount = 1;
	manifold.m_points[0].m_localPoint.setV(circle2.m_p);
	manifold.m_points[0].m_id.set_key(0);
}
box2D.collision.B2Collision.collidePolygonAndCircle = function(manifold,polygon,xf1,circle,xf2) {
	manifold.m_pointCount = 0;
	var tPoint;
	var dX;
	var dY;
	var positionX;
	var positionY;
	var tVec;
	var tMat;
	tMat = xf2.R;
	tVec = circle.m_p;
	var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	dX = cX - xf1.position.x;
	dY = cY - xf1.position.y;
	tMat = xf1.R;
	var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
	var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
	var dist;
	var normalIndex = 0;
	var separation = -box2D.common.math.B2Math.get_MAX_VALUE();
	var radius = polygon.m_radius + circle.m_radius;
	var vertexCount = polygon.m_vertexCount;
	var vertices = polygon.m_vertices;
	var normals = polygon.m_normals;
	var _g = 0;
	while(_g < vertexCount) {
		var i = _g++;
		tVec = vertices[i];
		dX = cLocalX - tVec.x;
		dY = cLocalY - tVec.y;
		tVec = normals[i];
		var s = tVec.x * dX + tVec.y * dY;
		if(s > radius) return;
		if(s > separation) {
			separation = s;
			normalIndex = i;
		}
	}
	var vertIndex1 = normalIndex;
	var vertIndex2 = vertIndex1 + 1 < vertexCount?vertIndex1 + 1:0;
	var v1 = vertices[vertIndex1];
	var v2 = vertices[vertIndex2];
	if(separation < box2D.common.math.B2Math.get_MIN_VALUE()) {
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_A;
		manifold.m_localPlaneNormal.setV(normals[normalIndex]);
		manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
		manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.set_key(0);
		return;
	}
	var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
	var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
	if(u1 <= 0.0) {
		if((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_A;
		manifold.m_localPlaneNormal.x = cLocalX - v1.x;
		manifold.m_localPlaneNormal.y = cLocalY - v1.y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.setV(v1);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.set_key(0);
	} else if(u2 <= 0) {
		if((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_A;
		manifold.m_localPlaneNormal.x = cLocalX - v2.x;
		manifold.m_localPlaneNormal.y = cLocalY - v2.y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.setV(v2);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.set_key(0);
	} else {
		var faceCenterX = 0.5 * (v1.x + v2.x);
		var faceCenterY = 0.5 * (v1.y + v2.y);
		separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
		if(separation > radius) return;
		manifold.m_pointCount = 1;
		manifold.m_type = box2D.collision.B2ManifoldType.FACE_A;
		manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
		manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
		manifold.m_localPlaneNormal.normalize();
		manifold.m_localPoint.set(faceCenterX,faceCenterY);
		manifold.m_points[0].m_localPoint.setV(circle.m_p);
		manifold.m_points[0].m_id.set_key(0);
	}
}
box2D.collision.B2Simplex = function() {
	this.m_v1 = new box2D.collision.B2SimplexVertex();
	this.m_v2 = new box2D.collision.B2SimplexVertex();
	this.m_v3 = new box2D.collision.B2SimplexVertex();
	this.m_vertices = new Array();
	this.m_vertices[0] = this.m_v1;
	this.m_vertices[1] = this.m_v2;
	this.m_vertices[2] = this.m_v3;
};
$hxClasses["box2D.collision.B2Simplex"] = box2D.collision.B2Simplex;
box2D.collision.B2Simplex.__name__ = true;
box2D.collision.B2Simplex.prototype = {
	solve3: function() {
		var w1 = this.m_v1.w;
		var w2 = this.m_v2.w;
		var w3 = this.m_v3.w;
		var e12 = box2D.common.math.B2Math.subtractVV(w2,w1);
		var w1e12 = box2D.common.math.B2Math.dot(w1,e12);
		var w2e12 = box2D.common.math.B2Math.dot(w2,e12);
		var d12_1 = w2e12;
		var d12_2 = -w1e12;
		var e13 = box2D.common.math.B2Math.subtractVV(w3,w1);
		var w1e13 = box2D.common.math.B2Math.dot(w1,e13);
		var w3e13 = box2D.common.math.B2Math.dot(w3,e13);
		var d13_1 = w3e13;
		var d13_2 = -w1e13;
		var e23 = box2D.common.math.B2Math.subtractVV(w3,w2);
		var w2e23 = box2D.common.math.B2Math.dot(w2,e23);
		var w3e23 = box2D.common.math.B2Math.dot(w3,e23);
		var d23_1 = w3e23;
		var d23_2 = -w2e23;
		var n123 = box2D.common.math.B2Math.crossVV(e12,e13);
		var d123_1 = n123 * box2D.common.math.B2Math.crossVV(w2,w3);
		var d123_2 = n123 * box2D.common.math.B2Math.crossVV(w3,w1);
		var d123_3 = n123 * box2D.common.math.B2Math.crossVV(w1,w2);
		if(d12_2 <= 0.0 && d13_2 <= 0.0) {
			this.m_v1.a = 1.0;
			this.m_count = 1;
			return;
		}
		if(d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
			var inv_d12 = 1.0 / (d12_1 + d12_2);
			this.m_v1.a = d12_1 * inv_d12;
			this.m_v2.a = d12_2 * inv_d12;
			this.m_count = 2;
			return;
		}
		if(d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
			var inv_d13 = 1.0 / (d13_1 + d13_2);
			this.m_v1.a = d13_1 * inv_d13;
			this.m_v3.a = d13_2 * inv_d13;
			this.m_count = 2;
			this.m_v2.set(this.m_v3);
			return;
		}
		if(d12_1 <= 0.0 && d23_2 <= 0.0) {
			this.m_v2.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v2);
			return;
		}
		if(d13_1 <= 0.0 && d23_1 <= 0.0) {
			this.m_v3.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v3);
			return;
		}
		if(d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
			var inv_d23 = 1.0 / (d23_1 + d23_2);
			this.m_v2.a = d23_1 * inv_d23;
			this.m_v3.a = d23_2 * inv_d23;
			this.m_count = 2;
			this.m_v1.set(this.m_v3);
			return;
		}
		var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
		this.m_v1.a = d123_1 * inv_d123;
		this.m_v2.a = d123_2 * inv_d123;
		this.m_v3.a = d123_3 * inv_d123;
		this.m_count = 3;
	}
	,solve2: function() {
		var w1 = this.m_v1.w;
		var w2 = this.m_v2.w;
		var e12 = box2D.common.math.B2Math.subtractVV(w2,w1);
		var d12_2 = -(w1.x * e12.x + w1.y * e12.y);
		if(d12_2 <= 0.0) {
			this.m_v1.a = 1.0;
			this.m_count = 1;
			return;
		}
		var d12_1 = w2.x * e12.x + w2.y * e12.y;
		if(d12_1 <= 0.0) {
			this.m_v2.a = 1.0;
			this.m_count = 1;
			this.m_v1.set(this.m_v2);
			return;
		}
		var inv_d12 = 1.0 / (d12_1 + d12_2);
		this.m_v1.a = d12_1 * inv_d12;
		this.m_v2.a = d12_2 * inv_d12;
		this.m_count = 2;
	}
	,getMetric: function() {
		var _g = this;
		switch(_g.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			return 0.0;
		case 1:
			return 0.0;
		case 2:
			return box2D.common.math.B2Math.subtractVV(this.m_v1.w,this.m_v2.w).length();
		case 3:
			return box2D.common.math.B2Math.crossVV(box2D.common.math.B2Math.subtractVV(this.m_v2.w,this.m_v1.w),box2D.common.math.B2Math.subtractVV(this.m_v3.w,this.m_v1.w));
		default:
			box2D.common.B2Settings.b2Assert(false);
			return 0.0;
		}
	}
	,getWitnessPoints: function(pA,pB) {
		var _g = this;
		switch(_g.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			break;
		case 1:
			pA.setV(this.m_v1.wA);
			pB.setV(this.m_v1.wB);
			break;
		case 2:
			pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
			pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
			pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
			pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
			break;
		case 3:
			pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
			pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
	}
	,getClosestPoint: function() {
		var _g = this;
		switch(_g.m_count) {
		case 0:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		case 1:
			return this.m_v1.w;
		case 2:
			return new box2D.common.math.B2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x,this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
		default:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		}
	}
	,getSearchDirection: function() {
		var _g = this;
		switch(_g.m_count) {
		case 1:
			return this.m_v1.w.getNegative();
		case 2:
			var e12 = box2D.common.math.B2Math.subtractVV(this.m_v2.w,this.m_v1.w);
			var sgn = box2D.common.math.B2Math.crossVV(e12,this.m_v1.w.getNegative());
			if(sgn > 0.0) return box2D.common.math.B2Math.crossFV(1.0,e12); else return box2D.common.math.B2Math.crossVF(e12,1.0);
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
			return new box2D.common.math.B2Vec2();
		}
	}
	,writeCache: function(cache) {
		cache.metric = this.getMetric();
		cache.count = Std["int"](this.m_count);
		var vertices = this.m_vertices;
		var _g1 = 0, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			cache.indexA[i] = Std["int"](vertices[i].indexA);
			cache.indexB[i] = Std["int"](vertices[i].indexB);
		}
	}
	,readCache: function(cache,proxyA,transformA,proxyB,transformB) {
		box2D.common.B2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
		var wALocal;
		var wBLocal;
		this.m_count = cache.count;
		var vertices = this.m_vertices;
		var v;
		var _g1 = 0, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			v = vertices[i];
			v.indexA = cache.indexA[i];
			v.indexB = cache.indexB[i];
			wALocal = proxyA.getVertex(v.indexA);
			wBLocal = proxyB.getVertex(v.indexB);
			v.wA = box2D.common.math.B2Math.mulX(transformA,wALocal);
			v.wB = box2D.common.math.B2Math.mulX(transformB,wBLocal);
			v.w = box2D.common.math.B2Math.subtractVV(v.wB,v.wA);
			v.a = 0;
		}
		if(this.m_count > 1) {
			var metric1 = cache.metric;
			var metric2 = this.getMetric();
			if(metric2 < .5 * metric1 || 2.0 * metric1 < metric2 || metric2 < box2D.common.math.B2Math.get_MIN_VALUE()) this.m_count = 0;
		}
		if(this.m_count == 0) {
			v = vertices[0];
			v.indexA = 0;
			v.indexB = 0;
			wALocal = proxyA.getVertex(0);
			wBLocal = proxyB.getVertex(0);
			v.wA = box2D.common.math.B2Math.mulX(transformA,wALocal);
			v.wB = box2D.common.math.B2Math.mulX(transformB,wBLocal);
			v.w = box2D.common.math.B2Math.subtractVV(v.wB,v.wA);
			this.m_count = 1;
		}
	}
	,__class__: box2D.collision.B2Simplex
}
box2D.collision.B2SimplexVertex = function() {
};
$hxClasses["box2D.collision.B2SimplexVertex"] = box2D.collision.B2SimplexVertex;
box2D.collision.B2SimplexVertex.__name__ = true;
box2D.collision.B2SimplexVertex.prototype = {
	set: function(other) {
		this.wA.setV(other.wA);
		this.wB.setV(other.wB);
		this.w.setV(other.w);
		this.a = other.a;
		this.indexA = other.indexA;
		this.indexB = other.indexB;
	}
	,__class__: box2D.collision.B2SimplexVertex
}
box2D.collision.B2Distance = function() { }
$hxClasses["box2D.collision.B2Distance"] = box2D.collision.B2Distance;
box2D.collision.B2Distance.__name__ = true;
box2D.collision.B2Distance.distance = function(output,cache,input) {
	++box2D.collision.B2Distance.b2_gjkCalls;
	var proxyA = input.proxyA;
	var proxyB = input.proxyB;
	var transformA = input.transformA;
	var transformB = input.transformB;
	var simplex = box2D.collision.B2Distance.s_simplex;
	simplex.readCache(cache,proxyA,transformA,proxyB,transformB);
	var vertices = simplex.m_vertices;
	var k_maxIters = 20;
	var saveA = box2D.collision.B2Distance.s_saveA;
	var saveB = box2D.collision.B2Distance.s_saveB;
	var saveCount = 0;
	var closestPoint = simplex.getClosestPoint();
	var distanceSqr1 = closestPoint.lengthSquared();
	var distanceSqr2 = distanceSqr1;
	var i;
	var p;
	var iter = 0;
	while(iter < k_maxIters) {
		saveCount = simplex.m_count;
		var _g = 0;
		while(_g < saveCount) {
			var i1 = _g++;
			saveA[i1] = vertices[i1].indexA;
			saveB[i1] = vertices[i1].indexB;
		}
		switch(simplex.m_count) {
		case 1:
			break;
		case 2:
			simplex.solve2();
			break;
		case 3:
			simplex.solve3();
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
		if(simplex.m_count == 3) break;
		p = simplex.getClosestPoint();
		distanceSqr2 = p.lengthSquared();
		if(distanceSqr2 > distanceSqr1) {
		}
		distanceSqr1 = distanceSqr2;
		var d = simplex.getSearchDirection();
		if(d.lengthSquared() < box2D.common.math.B2Math.get_MIN_VALUE() * box2D.common.math.B2Math.get_MIN_VALUE()) break;
		var vertex = vertices[simplex.m_count];
		vertex.indexA = Std["int"](proxyA.getSupport(box2D.common.math.B2Math.mulTMV(transformA.R,d.getNegative())));
		vertex.wA = box2D.common.math.B2Math.mulX(transformA,proxyA.getVertex(vertex.indexA));
		vertex.indexB = Std["int"](proxyB.getSupport(box2D.common.math.B2Math.mulTMV(transformB.R,d)));
		vertex.wB = box2D.common.math.B2Math.mulX(transformB,proxyB.getVertex(vertex.indexB));
		vertex.w = box2D.common.math.B2Math.subtractVV(vertex.wB,vertex.wA);
		++iter;
		++box2D.collision.B2Distance.b2_gjkIters;
		var duplicate = false;
		var _g = 0;
		while(_g < saveCount) {
			var i1 = _g++;
			if(vertex.indexA == saveA[i1] && vertex.indexB == saveB[i1]) {
				duplicate = true;
				break;
			}
		}
		if(duplicate) break;
		++simplex.m_count;
	}
	box2D.collision.B2Distance.b2_gjkMaxIters = Std["int"](box2D.common.math.B2Math.max(box2D.collision.B2Distance.b2_gjkMaxIters,iter));
	simplex.getWitnessPoints(output.pointA,output.pointB);
	output.distance = box2D.common.math.B2Math.subtractVV(output.pointA,output.pointB).length();
	output.iterations = iter;
	simplex.writeCache(cache);
	if(input.useRadii) {
		var rA = proxyA.m_radius;
		var rB = proxyB.m_radius;
		if(output.distance > rA + rB && output.distance > box2D.common.math.B2Math.get_MIN_VALUE()) {
			output.distance -= rA + rB;
			var normal = box2D.common.math.B2Math.subtractVV(output.pointB,output.pointA);
			normal.normalize();
			output.pointA.x += rA * normal.x;
			output.pointA.y += rA * normal.y;
			output.pointB.x -= rB * normal.x;
			output.pointB.y -= rB * normal.y;
		} else {
			p = new box2D.common.math.B2Vec2();
			p.x = .5 * (output.pointA.x + output.pointB.x);
			p.y = .5 * (output.pointA.y + output.pointB.y);
			output.pointA.x = output.pointB.x = p.x;
			output.pointA.y = output.pointB.y = p.y;
			output.distance = 0.0;
		}
	}
}
box2D.collision.B2DistanceInput = function() {
};
$hxClasses["box2D.collision.B2DistanceInput"] = box2D.collision.B2DistanceInput;
box2D.collision.B2DistanceInput.__name__ = true;
box2D.collision.B2DistanceInput.prototype = {
	__class__: box2D.collision.B2DistanceInput
}
box2D.collision.B2DistanceOutput = function() {
	this.pointA = new box2D.common.math.B2Vec2();
	this.pointB = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.collision.B2DistanceOutput"] = box2D.collision.B2DistanceOutput;
box2D.collision.B2DistanceOutput.__name__ = true;
box2D.collision.B2DistanceOutput.prototype = {
	__class__: box2D.collision.B2DistanceOutput
}
box2D.collision.B2DistanceProxy = function() {
	this.m_vertices = new Array();
};
$hxClasses["box2D.collision.B2DistanceProxy"] = box2D.collision.B2DistanceProxy;
box2D.collision.B2DistanceProxy.__name__ = true;
box2D.collision.B2DistanceProxy.prototype = {
	getVertex: function(index) {
		box2D.common.B2Settings.b2Assert(0 <= index && index < this.m_count);
		return this.m_vertices[index];
	}
	,getSupportVertex: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return this.m_vertices[bestIndex];
	}
	,getSupport: function(d) {
		var bestIndex = 0;
		var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
		var _g1 = 1, _g = this.m_count;
		while(_g1 < _g) {
			var i = _g1++;
			var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
			if(value > bestValue) {
				bestIndex = i;
				bestValue = value;
			}
		}
		return bestIndex;
	}
	,set: function(shape) {
		var _g = shape.getType();
		switch( (_g)[1] ) {
		case 1:
			var circle = js.Boot.__cast(shape , box2D.collision.shapes.B2CircleShape);
			this.m_vertices = new Array();
			this.m_vertices[0] = circle.m_p;
			this.m_count = 1;
			this.m_radius = circle.m_radius;
			break;
		case 2:
			var polygon = js.Boot.__cast(shape , box2D.collision.shapes.B2PolygonShape);
			this.m_vertices = polygon.m_vertices;
			this.m_count = polygon.m_vertexCount;
			this.m_radius = polygon.m_radius;
			break;
		default:
			box2D.common.B2Settings.b2Assert(false);
		}
	}
	,__class__: box2D.collision.B2DistanceProxy
}
box2D.collision.B2DynamicTree = function() {
	this.m_root = null;
	this.m_freeList = null;
	this.m_path = 0;
	this.m_insertionCount = 0;
};
$hxClasses["box2D.collision.B2DynamicTree"] = box2D.collision.B2DynamicTree;
box2D.collision.B2DynamicTree.__name__ = true;
box2D.collision.B2DynamicTree.prototype = {
	removeLeaf: function(leaf) {
		if(leaf == this.m_root) {
			this.m_root = null;
			return;
		}
		var node2 = leaf.parent;
		var node1 = node2.parent;
		var sibling;
		if(node2.child1 == leaf) sibling = node2.child2; else sibling = node2.child1;
		if(node1 != null) {
			if(node1.child1 == node2) node1.child1 = sibling; else node1.child2 = sibling;
			sibling.parent = node1;
			this.freeNode(node2);
			while(node1 != null) {
				var oldAABB = node1.aabb;
				node1.aabb = new box2D.collision.B2AABB();
				node1.aabb.combine(node1.child1.aabb,node1.child2.aabb);
				if(oldAABB.contains(node1.aabb)) break;
				node1 = node1.parent;
			}
		} else {
			this.m_root = sibling;
			sibling.parent = null;
			this.freeNode(node2);
		}
	}
	,insertLeaf: function(leaf) {
		++this.m_insertionCount;
		if(this.m_root == null) {
			this.m_root = leaf;
			this.m_root.parent = null;
			return;
		}
		var center = leaf.aabb.getCenter();
		var sibling = this.m_root;
		if(sibling.isLeaf() == false) do {
			var child1 = sibling.child1;
			var child2 = sibling.child2;
			var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
			var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
			if(norm1 < norm2) sibling = child1; else sibling = child2;
		} while(sibling.isLeaf() == false);
		var node1 = sibling.parent;
		var node2 = this.allocateNode();
		node2.parent = node1;
		node2.userData = null;
		node2.aabb.combine(leaf.aabb,sibling.aabb);
		if(node1 != null) {
			if(sibling.parent.child1 == sibling) node1.child1 = node2; else node1.child2 = node2;
			node2.child1 = sibling;
			node2.child2 = leaf;
			sibling.parent = node2;
			leaf.parent = node2;
			do {
				if(node1.aabb.contains(node2.aabb)) break;
				node1.aabb.combine(node1.child1.aabb,node1.child2.aabb);
				node2 = node1;
				node1 = node1.parent;
			} while(node1 != null);
		} else {
			node2.child1 = sibling;
			node2.child2 = leaf;
			sibling.parent = node2;
			leaf.parent = node2;
			this.m_root = node2;
		}
	}
	,freeNode: function(node) {
		node.parent = this.m_freeList;
		this.m_freeList = node;
	}
	,allocateNode: function() {
		if(this.m_freeList != null) {
			var node = this.m_freeList;
			this.m_freeList = node.parent;
			node.parent = null;
			node.child1 = null;
			node.child2 = null;
			return node;
		}
		return new box2D.collision.B2DynamicTreeNode();
	}
	,query: function(callbackMethod,aabb) {
		if(this.m_root == null) return;
		var stack = new Array();
		var count = 0;
		stack[count++] = this.m_root;
		while(count > 0) {
			var node = stack[--count];
			if(node.aabb.testOverlap(aabb)) {
				if(node.isLeaf()) {
					var proceed = callbackMethod(node);
					if(!proceed) return;
				} else {
					stack[count++] = node.child1;
					stack[count++] = node.child2;
				}
			}
		}
	}
	,getUserData: function(proxy) {
		return proxy.userData;
	}
	,getFatAABB: function(proxy) {
		return proxy.aabb;
	}
	,moveProxy: function(proxy,aabb,displacement) {
		box2D.common.B2Settings.b2Assert(proxy.isLeaf());
		if(proxy.aabb.contains(aabb)) return false;
		this.removeLeaf(proxy);
		var extendX = box2D.common.B2Settings.b2_aabbExtension + box2D.common.B2Settings.b2_aabbMultiplier * (displacement.x > 0?displacement.x:-displacement.x);
		var extendY = box2D.common.B2Settings.b2_aabbExtension + box2D.common.B2Settings.b2_aabbMultiplier * (displacement.y > 0?displacement.y:-displacement.y);
		proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
		proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
		proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
		proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
		this.insertLeaf(proxy);
		return true;
	}
	,destroyProxy: function(proxy) {
		this.removeLeaf(proxy);
		this.freeNode(proxy);
	}
	,createProxy: function(aabb,userData) {
		var node = this.allocateNode();
		var extendX = box2D.common.B2Settings.b2_aabbExtension;
		var extendY = box2D.common.B2Settings.b2_aabbExtension;
		node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
		node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
		node.aabb.upperBound.x = aabb.upperBound.x + extendX;
		node.aabb.upperBound.y = aabb.upperBound.y + extendY;
		node.userData = userData;
		this.insertLeaf(node);
		return node;
	}
	,__class__: box2D.collision.B2DynamicTree
}
box2D.collision.IBroadPhase = function() { }
$hxClasses["box2D.collision.IBroadPhase"] = box2D.collision.IBroadPhase;
box2D.collision.IBroadPhase.__name__ = true;
box2D.collision.IBroadPhase.prototype = {
	__class__: box2D.collision.IBroadPhase
}
box2D.collision.B2DynamicTreeBroadPhase = function() {
	this.m_tree = new box2D.collision.B2DynamicTree();
	this.m_moveBuffer = new Array();
	this.m_pairBuffer = new Array();
	this.m_pairCount = 0;
};
$hxClasses["box2D.collision.B2DynamicTreeBroadPhase"] = box2D.collision.B2DynamicTreeBroadPhase;
box2D.collision.B2DynamicTreeBroadPhase.__name__ = true;
box2D.collision.B2DynamicTreeBroadPhase.__interfaces__ = [box2D.collision.IBroadPhase];
box2D.collision.B2DynamicTreeBroadPhase.prototype = {
	unBufferMove: function(proxy) {
		HxOverrides.remove(this.m_moveBuffer,proxy);
	}
	,bufferMove: function(proxy) {
		this.m_moveBuffer[this.m_moveBuffer.length] = proxy;
	}
	,updatePairs: function(callbackMethod) {
		var _g2 = this;
		this.m_pairCount = 0;
		var _g = 0, _g1 = this.m_moveBuffer;
		while(_g < _g1.length) {
			var queryProxy = [_g1[_g]];
			++_g;
			var queryCallback = (function(queryProxy) {
				return function(proxy) {
					if(proxy == queryProxy[0]) return true;
					if(_g2.m_pairCount == _g2.m_pairBuffer.length) _g2.m_pairBuffer[_g2.m_pairCount] = new box2D.collision.B2DynamicTreePair();
					var pair = _g2.m_pairBuffer[_g2.m_pairCount];
					if(proxy.id < queryProxy[0].id) {
						pair.proxyA = proxy;
						pair.proxyB = queryProxy[0];
					} else {
						pair.proxyA = queryProxy[0];
						pair.proxyB = proxy;
					}
					++_g2.m_pairCount;
					return true;
				};
			})(queryProxy);
			var fatAABB = this.m_tree.getFatAABB(queryProxy[0]);
			this.m_tree.query(queryCallback,fatAABB);
		}
		this.m_moveBuffer = new Array();
		var pairing = true;
		var i = 0;
		while(pairing) if(i >= this.m_pairCount) pairing = false; else {
			var primaryPair = this.m_pairBuffer[i];
			var userDataA = this.m_tree.getUserData(primaryPair.proxyA);
			var userDataB = this.m_tree.getUserData(primaryPair.proxyB);
			callbackMethod(userDataA,userDataB);
			++i;
			while(i < this.m_pairCount) {
				var pair = this.m_pairBuffer[i];
				if(pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) break;
				++i;
			}
		}
	}
	,getFatAABB: function(proxy) {
		return this.m_tree.getFatAABB(proxy);
	}
	,testOverlap: function(proxyA,proxyB) {
		var aabbA = this.m_tree.getFatAABB(proxyA);
		var aabbB = this.m_tree.getFatAABB(proxyB);
		return aabbA.testOverlap(aabbB);
	}
	,moveProxy: function(proxy,aabb,displacement) {
		var buffer = this.m_tree.moveProxy(proxy,aabb,displacement);
		if(buffer) this.bufferMove(proxy);
	}
	,destroyProxy: function(proxy) {
		this.unBufferMove(proxy);
		--this.m_proxyCount;
		this.m_tree.destroyProxy(proxy);
	}
	,createProxy: function(aabb,userData) {
		var proxy = this.m_tree.createProxy(aabb,userData);
		++this.m_proxyCount;
		this.bufferMove(proxy);
		return proxy;
	}
	,__class__: box2D.collision.B2DynamicTreeBroadPhase
}
box2D.collision.B2DynamicTreeNode = function() {
	this.aabb = new box2D.collision.B2AABB();
	this.id = box2D.collision.B2DynamicTreeNode.currentID++;
};
$hxClasses["box2D.collision.B2DynamicTreeNode"] = box2D.collision.B2DynamicTreeNode;
box2D.collision.B2DynamicTreeNode.__name__ = true;
box2D.collision.B2DynamicTreeNode.prototype = {
	isLeaf: function() {
		return this.child1 == null;
	}
	,__class__: box2D.collision.B2DynamicTreeNode
}
box2D.collision.B2DynamicTreePair = function() {
};
$hxClasses["box2D.collision.B2DynamicTreePair"] = box2D.collision.B2DynamicTreePair;
box2D.collision.B2DynamicTreePair.__name__ = true;
box2D.collision.B2DynamicTreePair.prototype = {
	__class__: box2D.collision.B2DynamicTreePair
}
box2D.collision.B2Manifold = function() {
	this.m_pointCount = 0;
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.collision.B2ManifoldPoint();
	}
	this.m_localPlaneNormal = new box2D.common.math.B2Vec2();
	this.m_localPoint = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.collision.B2Manifold"] = box2D.collision.B2Manifold;
box2D.collision.B2Manifold.__name__ = true;
box2D.collision.B2Manifold.prototype = {
	__class__: box2D.collision.B2Manifold
}
box2D.collision.B2ManifoldPoint = function() {
	this.m_localPoint = new box2D.common.math.B2Vec2();
	this.m_id = new box2D.collision.B2ContactID();
	this.reset();
};
$hxClasses["box2D.collision.B2ManifoldPoint"] = box2D.collision.B2ManifoldPoint;
box2D.collision.B2ManifoldPoint.__name__ = true;
box2D.collision.B2ManifoldPoint.prototype = {
	reset: function() {
		this.m_localPoint.setZero();
		this.m_normalImpulse = 0.0;
		this.m_tangentImpulse = 0.0;
		this.m_id.set_key(0);
	}
	,__class__: box2D.collision.B2ManifoldPoint
}
box2D.collision.B2ManifoldType = $hxClasses["box2D.collision.B2ManifoldType"] = { __ename__ : true, __constructs__ : ["CIRCLES","FACE_A","FACE_B"] }
box2D.collision.B2ManifoldType.CIRCLES = ["CIRCLES",0];
box2D.collision.B2ManifoldType.CIRCLES.toString = $estr;
box2D.collision.B2ManifoldType.CIRCLES.__enum__ = box2D.collision.B2ManifoldType;
box2D.collision.B2ManifoldType.FACE_A = ["FACE_A",1];
box2D.collision.B2ManifoldType.FACE_A.toString = $estr;
box2D.collision.B2ManifoldType.FACE_A.__enum__ = box2D.collision.B2ManifoldType;
box2D.collision.B2ManifoldType.FACE_B = ["FACE_B",2];
box2D.collision.B2ManifoldType.FACE_B.toString = $estr;
box2D.collision.B2ManifoldType.FACE_B.__enum__ = box2D.collision.B2ManifoldType;
box2D.collision.B2SeparationFunction = function() {
	this.m_localPoint = new box2D.common.math.B2Vec2();
	this.m_axis = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.collision.B2SeparationFunction"] = box2D.collision.B2SeparationFunction;
box2D.collision.B2SeparationFunction.__name__ = true;
box2D.collision.B2SeparationFunction.prototype = {
	evaluate: function(transformA,transformB) {
		var axisA;
		var axisB;
		var localPointA;
		var localPointB;
		var pointA;
		var pointB;
		var seperation;
		var normal;
		var _g = this;
		switch( (_g.m_type)[1] ) {
		case 0:
			axisA = box2D.common.math.B2Math.mulTMV(transformA.R,this.m_axis);
			axisB = box2D.common.math.B2Math.mulTMV(transformB.R,this.m_axis.getNegative());
			localPointA = this.m_proxyA.getSupportVertex(axisA);
			localPointB = this.m_proxyB.getSupportVertex(axisB);
			pointA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			pointB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
			return seperation;
		case 1:
			normal = box2D.common.math.B2Math.mulMV(transformA.R,this.m_axis);
			pointA = box2D.common.math.B2Math.mulX(transformA,this.m_localPoint);
			axisB = box2D.common.math.B2Math.mulTMV(transformB.R,normal.getNegative());
			localPointB = this.m_proxyB.getSupportVertex(axisB);
			pointB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
			return seperation;
		case 2:
			normal = box2D.common.math.B2Math.mulMV(transformB.R,this.m_axis);
			pointB = box2D.common.math.B2Math.mulX(transformB,this.m_localPoint);
			axisA = box2D.common.math.B2Math.mulTMV(transformA.R,normal.getNegative());
			localPointA = this.m_proxyA.getSupportVertex(axisA);
			pointA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
			return seperation;
		}
	}
	,initialize: function(cache,proxyA,transformA,proxyB,transformB) {
		this.m_proxyA = proxyA;
		this.m_proxyB = proxyB;
		var count = cache.count;
		box2D.common.B2Settings.b2Assert(0 < count && count < 3);
		var localPointA = new box2D.common.math.B2Vec2();
		var localPointA1;
		var localPointA2;
		var localPointB = new box2D.common.math.B2Vec2();
		var localPointB1;
		var localPointB2;
		var pointAX;
		var pointAY;
		var pointBX;
		var pointBY;
		var normalX;
		var normalY;
		var tMat;
		var tVec;
		var s;
		var sgn;
		if(count == 1) {
			this.m_type = box2D.collision.B2SeparationFunctionType.POINTS;
			localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
			tVec = localPointA;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointB;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			this.m_axis.x = pointBX - pointAX;
			this.m_axis.y = pointBY - pointAY;
			this.m_axis.normalize();
		} else if(cache.indexB[0] == cache.indexB[1]) {
			this.m_type = box2D.collision.B2SeparationFunctionType.FACE_A;
			localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
			localPointB = this.m_proxyB.getVertex(cache.indexB[0]);
			this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
			this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
			this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1),1.0);
			this.m_axis.normalize();
			tVec = this.m_axis;
			tMat = transformA.R;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tVec = this.m_localPoint;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointB;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
			if(s < 0.0) this.m_axis.negativeSelf();
		} else if(cache.indexA[0] == cache.indexA[0]) {
			this.m_type = box2D.collision.B2SeparationFunctionType.FACE_B;
			localPointB1 = this.m_proxyB.getVertex(cache.indexB[0]);
			localPointB2 = this.m_proxyB.getVertex(cache.indexB[1]);
			localPointA = this.m_proxyA.getVertex(cache.indexA[0]);
			this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
			this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
			this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1),1.0);
			this.m_axis.normalize();
			tVec = this.m_axis;
			tMat = transformB.R;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tVec = this.m_localPoint;
			tMat = transformB.R;
			pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tVec = localPointA;
			tMat = transformA.R;
			pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
			if(s < 0.0) this.m_axis.negativeSelf();
		} else {
			localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
			localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
			localPointB1 = this.m_proxyB.getVertex(cache.indexB[0]);
			localPointB2 = this.m_proxyB.getVertex(cache.indexB[1]);
			var pA = box2D.common.math.B2Math.mulX(transformA,localPointA);
			var dA = box2D.common.math.B2Math.mulMV(transformA.R,box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1));
			var pB = box2D.common.math.B2Math.mulX(transformB,localPointB);
			var dB = box2D.common.math.B2Math.mulMV(transformB.R,box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1));
			var a = dA.x * dA.x + dA.y * dA.y;
			var e = dB.x * dB.x + dB.y * dB.y;
			var r = box2D.common.math.B2Math.subtractVV(dB,dA);
			var c = dA.x * r.x + dA.y * r.y;
			var f = dB.x * r.x + dB.y * r.y;
			var b = dA.x * dB.x + dA.y * dB.y;
			var denom = a * e - b * b;
			s = 0.0;
			if(denom != 0.0) s = box2D.common.math.B2Math.clamp((b * f - c * e) / denom,0.0,1.0);
			var t = (b * s + f) / e;
			if(t < 0.0) {
				t = 0.0;
				s = box2D.common.math.B2Math.clamp((b - c) / a,0.0,1.0);
			}
			localPointA = new box2D.common.math.B2Vec2();
			localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
			localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
			localPointB = new box2D.common.math.B2Vec2();
			localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
			localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
			if(s == 0.0 || s == 1.0) {
				this.m_type = box2D.collision.B2SeparationFunctionType.FACE_B;
				this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointB2,localPointB1),1.0);
				this.m_axis.normalize();
				this.m_localPoint = localPointB;
				tVec = this.m_axis;
				tMat = transformB.R;
				normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				tVec = this.m_localPoint;
				tMat = transformB.R;
				pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				tVec = localPointA;
				tMat = transformA.R;
				pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
				if(s < 0.0) this.m_axis.negativeSelf();
			} else {
				this.m_type = box2D.collision.B2SeparationFunctionType.FACE_A;
				this.m_axis = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(localPointA2,localPointA1),1.0);
				this.m_localPoint = localPointA;
				tVec = this.m_axis;
				tMat = transformA.R;
				normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				tVec = this.m_localPoint;
				tMat = transformA.R;
				pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				tVec = localPointB;
				tMat = transformB.R;
				pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
				if(s < 0.0) this.m_axis.negativeSelf();
			}
		}
	}
	,__class__: box2D.collision.B2SeparationFunction
}
box2D.collision.B2SeparationFunctionType = $hxClasses["box2D.collision.B2SeparationFunctionType"] = { __ename__ : true, __constructs__ : ["POINTS","FACE_A","FACE_B"] }
box2D.collision.B2SeparationFunctionType.POINTS = ["POINTS",0];
box2D.collision.B2SeparationFunctionType.POINTS.toString = $estr;
box2D.collision.B2SeparationFunctionType.POINTS.__enum__ = box2D.collision.B2SeparationFunctionType;
box2D.collision.B2SeparationFunctionType.FACE_A = ["FACE_A",1];
box2D.collision.B2SeparationFunctionType.FACE_A.toString = $estr;
box2D.collision.B2SeparationFunctionType.FACE_A.__enum__ = box2D.collision.B2SeparationFunctionType;
box2D.collision.B2SeparationFunctionType.FACE_B = ["FACE_B",2];
box2D.collision.B2SeparationFunctionType.FACE_B.toString = $estr;
box2D.collision.B2SeparationFunctionType.FACE_B.__enum__ = box2D.collision.B2SeparationFunctionType;
box2D.collision.B2SimplexCache = function() {
	this.indexA = new Array();
	this.indexB = new Array();
};
$hxClasses["box2D.collision.B2SimplexCache"] = box2D.collision.B2SimplexCache;
box2D.collision.B2SimplexCache.__name__ = true;
box2D.collision.B2SimplexCache.prototype = {
	__class__: box2D.collision.B2SimplexCache
}
box2D.collision.B2TOIInput = function() {
	this.proxyA = new box2D.collision.B2DistanceProxy();
	this.proxyB = new box2D.collision.B2DistanceProxy();
	this.sweepA = new box2D.common.math.B2Sweep();
	this.sweepB = new box2D.common.math.B2Sweep();
};
$hxClasses["box2D.collision.B2TOIInput"] = box2D.collision.B2TOIInput;
box2D.collision.B2TOIInput.__name__ = true;
box2D.collision.B2TOIInput.prototype = {
	__class__: box2D.collision.B2TOIInput
}
box2D.common.math.B2Transform = function(pos,r) {
	this.position = new box2D.common.math.B2Vec2();
	this.R = new box2D.common.math.B2Mat22();
	if(pos != null) {
		this.position.setV(pos);
		this.R.setM(r);
	}
};
$hxClasses["box2D.common.math.B2Transform"] = box2D.common.math.B2Transform;
box2D.common.math.B2Transform.__name__ = true;
box2D.common.math.B2Transform.prototype = {
	__class__: box2D.common.math.B2Transform
}
box2D.common.math.B2Mat22 = function() {
	this.col1 = new box2D.common.math.B2Vec2(0,1.0);
	this.col2 = new box2D.common.math.B2Vec2(0,1.0);
};
$hxClasses["box2D.common.math.B2Mat22"] = box2D.common.math.B2Mat22;
box2D.common.math.B2Mat22.__name__ = true;
box2D.common.math.B2Mat22.prototype = {
	getInverse: function(out) {
		var a = this.col1.x;
		var b = this.col2.x;
		var c = this.col1.y;
		var d = this.col2.y;
		var det = a * d - b * c;
		if(det != 0.0) det = 1.0 / det;
		out.col1.x = det * d;
		out.col2.x = -det * b;
		out.col1.y = -det * c;
		out.col2.y = det * a;
		return out;
	}
	,setM: function(m) {
		this.col1.setV(m.col1);
		this.col2.setV(m.col2);
	}
	,set: function(angle) {
		var c = Math.cos(angle);
		var s = Math.sin(angle);
		this.col1.x = c;
		this.col2.x = -s;
		this.col1.y = s;
		this.col2.y = c;
	}
	,__class__: box2D.common.math.B2Mat22
}
box2D.collision.B2TimeOfImpact = function() { }
$hxClasses["box2D.collision.B2TimeOfImpact"] = box2D.collision.B2TimeOfImpact;
box2D.collision.B2TimeOfImpact.__name__ = true;
box2D.collision.B2TimeOfImpact.timeOfImpact = function(input) {
	++box2D.collision.B2TimeOfImpact.b2_toiCalls;
	var proxyA = input.proxyA;
	var proxyB = input.proxyB;
	var sweepA = input.sweepA;
	var sweepB = input.sweepB;
	box2D.common.B2Settings.b2Assert(sweepA.t0 == sweepB.t0);
	box2D.common.B2Settings.b2Assert(1.0 - sweepA.t0 > box2D.common.math.B2Math.get_MIN_VALUE());
	var radius = proxyA.m_radius + proxyB.m_radius;
	var tolerance = input.tolerance;
	var alpha = 0.0;
	var k_maxIterations = 1000;
	var iter = 0;
	var target = 0.0;
	box2D.collision.B2TimeOfImpact.s_cache.count = 0;
	box2D.collision.B2TimeOfImpact.s_distanceInput.useRadii = false;
	while(true) {
		sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,alpha);
		sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,alpha);
		box2D.collision.B2TimeOfImpact.s_distanceInput.proxyA = proxyA;
		box2D.collision.B2TimeOfImpact.s_distanceInput.proxyB = proxyB;
		box2D.collision.B2TimeOfImpact.s_distanceInput.transformA = box2D.collision.B2TimeOfImpact.s_xfA;
		box2D.collision.B2TimeOfImpact.s_distanceInput.transformB = box2D.collision.B2TimeOfImpact.s_xfB;
		box2D.collision.B2Distance.distance(box2D.collision.B2TimeOfImpact.s_distanceOutput,box2D.collision.B2TimeOfImpact.s_cache,box2D.collision.B2TimeOfImpact.s_distanceInput);
		if(box2D.collision.B2TimeOfImpact.s_distanceOutput.distance <= 0.0) {
			alpha = 1.0;
			break;
		}
		box2D.collision.B2TimeOfImpact.s_fcn.initialize(box2D.collision.B2TimeOfImpact.s_cache,proxyA,box2D.collision.B2TimeOfImpact.s_xfA,proxyB,box2D.collision.B2TimeOfImpact.s_xfB);
		var separation = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
		if(separation <= 0.0) {
			alpha = 1.0;
			break;
		}
		if(iter == 0) {
			if(separation > radius) target = box2D.common.math.B2Math.max(radius - tolerance,0.75 * radius); else target = box2D.common.math.B2Math.max(separation - tolerance,0.02 * radius);
		}
		if(separation - target < 0.5 * tolerance) {
			if(iter == 0) {
				alpha = 1.0;
				break;
			}
			break;
		}
		var newAlpha = alpha;
		var x1 = alpha;
		var x2 = 1.0;
		var f1 = separation;
		sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,x2);
		sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,x2);
		var f2 = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
		if(f2 >= target) {
			alpha = 1.0;
			break;
		}
		var rootIterCount = 0;
		while(true) {
			var x;
			if((rootIterCount & 1) != 0) x = x1 + (target - f1) * (x2 - x1) / (f2 - f1); else x = 0.5 * (x1 + x2);
			sweepA.getTransform(box2D.collision.B2TimeOfImpact.s_xfA,x);
			sweepB.getTransform(box2D.collision.B2TimeOfImpact.s_xfB,x);
			var f = box2D.collision.B2TimeOfImpact.s_fcn.evaluate(box2D.collision.B2TimeOfImpact.s_xfA,box2D.collision.B2TimeOfImpact.s_xfB);
			if(box2D.common.math.B2Math.abs(f - target) < 0.025 * tolerance) {
				newAlpha = x;
				break;
			}
			if(f > target) {
				x1 = x;
				f1 = f;
			} else {
				x2 = x;
				f2 = f;
			}
			++rootIterCount;
			++box2D.collision.B2TimeOfImpact.b2_toiRootIters;
			if(rootIterCount == 50) break;
		}
		box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters = Std["int"](box2D.common.math.B2Math.max(box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters,rootIterCount));
		if(newAlpha < (1.0 + 100.0 * box2D.common.math.B2Math.get_MIN_VALUE()) * alpha) break;
		alpha = newAlpha;
		iter++;
		++box2D.collision.B2TimeOfImpact.b2_toiIters;
		if(iter == k_maxIterations) break;
	}
	box2D.collision.B2TimeOfImpact.b2_toiMaxIters = Std["int"](box2D.common.math.B2Math.max(box2D.collision.B2TimeOfImpact.b2_toiMaxIters,iter));
	return alpha;
}
box2D.collision.B2WorldManifold = function() {
	this.m_normal = new box2D.common.math.B2Vec2();
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.common.math.B2Vec2();
	}
};
$hxClasses["box2D.collision.B2WorldManifold"] = box2D.collision.B2WorldManifold;
box2D.collision.B2WorldManifold.__name__ = true;
box2D.collision.B2WorldManifold.prototype = {
	initialize: function(manifold,xfA,radiusA,xfB,radiusB) {
		if(manifold.m_pointCount == 0) return;
		var i;
		var tVec;
		var tMat;
		var normalX;
		var normalY;
		var planePointX;
		var planePointY;
		var clipPointX;
		var clipPointY;
		switch( (manifold.m_type)[1] ) {
		case 0:
			tMat = xfA.R;
			tVec = manifold.m_localPoint;
			var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfB.R;
			tVec = manifold.m_points[0].m_localPoint;
			var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			var dX = pointBX - pointAX;
			var dY = pointBY - pointAY;
			var d2 = dX * dX + dY * dY;
			if(d2 > box2D.common.math.B2Math.get_MIN_VALUE() * box2D.common.math.B2Math.get_MIN_VALUE()) {
				var d = Math.sqrt(d2);
				this.m_normal.x = dX / d;
				this.m_normal.y = dY / d;
			} else {
				this.m_normal.x = 1;
				this.m_normal.y = 0;
			}
			var cAX = pointAX + radiusA * this.m_normal.x;
			var cAY = pointAY + radiusA * this.m_normal.y;
			var cBX = pointBX - radiusB * this.m_normal.x;
			var cBY = pointBY - radiusB * this.m_normal.y;
			this.m_points[0].x = 0.5 * (cAX + cBX);
			this.m_points[0].y = 0.5 * (cAY + cBY);
			break;
		case 1:
			tMat = xfA.R;
			tVec = manifold.m_localPlaneNormal;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfA.R;
			tVec = manifold.m_localPoint;
			planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			this.m_normal.x = normalX;
			this.m_normal.y = normalY;
			var _g1 = 0, _g = manifold.m_pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tMat = xfB.R;
				tVec = manifold.m_points[i1].m_localPoint;
				clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				this.m_points[i1].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
				this.m_points[i1].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY;
			}
			break;
		case 2:
			tMat = xfB.R;
			tVec = manifold.m_localPlaneNormal;
			normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = xfB.R;
			tVec = manifold.m_localPoint;
			planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			this.m_normal.x = -normalX;
			this.m_normal.y = -normalY;
			var _g1 = 0, _g = manifold.m_pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tMat = xfA.R;
				tVec = manifold.m_points[i1].m_localPoint;
				clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
				clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
				this.m_points[i1].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
				this.m_points[i1].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY;
			}
			break;
		}
	}
	,__class__: box2D.collision.B2WorldManifold
}
box2D.collision.shapes = {}
box2D.collision.shapes.B2Shape = function() {
	this.m_type = box2D.collision.shapes.B2ShapeType.UNKNOWN_SHAPE;
	this.m_radius = box2D.common.B2Settings.b2_linearSlop;
};
$hxClasses["box2D.collision.shapes.B2Shape"] = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2Shape.__name__ = true;
box2D.collision.shapes.B2Shape.testOverlap = function(shape1,transform1,shape2,transform2) {
	return true;
}
box2D.collision.shapes.B2Shape.prototype = {
	computeMass: function(massData,density) {
	}
	,computeAABB: function(aabb,xf) {
	}
	,getType: function() {
		return this.m_type;
	}
	,set: function(other) {
		this.m_radius = other.m_radius;
	}
	,copy: function() {
		return null;
	}
	,__class__: box2D.collision.shapes.B2Shape
}
box2D.collision.shapes.B2CircleShape = function(radius) {
	if(radius == null) radius = 0;
	box2D.collision.shapes.B2Shape.call(this);
	this.m_p = new box2D.common.math.B2Vec2();
	this.m_type = box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE;
	this.m_radius = radius;
};
$hxClasses["box2D.collision.shapes.B2CircleShape"] = box2D.collision.shapes.B2CircleShape;
box2D.collision.shapes.B2CircleShape.__name__ = true;
box2D.collision.shapes.B2CircleShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2CircleShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	setRadius: function(radius) {
		this.m_radius = radius;
	}
	,computeMass: function(massData,density) {
		massData.mass = density * box2D.common.B2Settings.b2_pi * this.m_radius * this.m_radius;
		massData.center.setV(this.m_p);
		massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
	}
	,computeAABB: function(aabb,transform) {
		var tMat = transform.R;
		var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
		var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
		aabb.lowerBound.set(pX - this.m_radius,pY - this.m_radius);
		aabb.upperBound.set(pX + this.m_radius,pY + this.m_radius);
	}
	,set: function(other) {
		box2D.collision.shapes.B2Shape.prototype.set.call(this,other);
		if(Std["is"](other,box2D.collision.shapes.B2CircleShape)) {
			var other2 = js.Boot.__cast(other , box2D.collision.shapes.B2CircleShape);
			this.m_p.setV(other2.m_p);
		}
	}
	,copy: function() {
		var s = new box2D.collision.shapes.B2CircleShape();
		s.set(this);
		return s;
	}
	,__class__: box2D.collision.shapes.B2CircleShape
});
box2D.collision.shapes.B2EdgeShape = function() { }
$hxClasses["box2D.collision.shapes.B2EdgeShape"] = box2D.collision.shapes.B2EdgeShape;
box2D.collision.shapes.B2EdgeShape.__name__ = true;
box2D.collision.shapes.B2EdgeShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2EdgeShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	getVertex2: function() {
		return this.m_v2;
	}
	,getVertex1: function() {
		return this.m_v1;
	}
	,computeMass: function(massData,density) {
		massData.mass = 0;
		massData.center.setV(this.m_v1);
		massData.I = 0;
	}
	,computeAABB: function(aabb,transform) {
		var tMat = transform.R;
		var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
		var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
		var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
		var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
		if(v1X < v2X) {
			aabb.lowerBound.x = v1X;
			aabb.upperBound.x = v2X;
		} else {
			aabb.lowerBound.x = v2X;
			aabb.upperBound.x = v1X;
		}
		if(v1Y < v2Y) {
			aabb.lowerBound.y = v1Y;
			aabb.upperBound.y = v2Y;
		} else {
			aabb.lowerBound.y = v2Y;
			aabb.upperBound.y = v1Y;
		}
	}
	,__class__: box2D.collision.shapes.B2EdgeShape
});
box2D.collision.shapes.B2MassData = function() {
	this.mass = 0.0;
	this.center = new box2D.common.math.B2Vec2(0,0);
	this.I = 0.0;
};
$hxClasses["box2D.collision.shapes.B2MassData"] = box2D.collision.shapes.B2MassData;
box2D.collision.shapes.B2MassData.__name__ = true;
box2D.collision.shapes.B2MassData.prototype = {
	__class__: box2D.collision.shapes.B2MassData
}
box2D.collision.shapes.B2PolygonShape = function() {
	box2D.collision.shapes.B2Shape.call(this);
	this.m_type = box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE;
	this.m_centroid = new box2D.common.math.B2Vec2();
	this.m_vertices = new Array();
	this.m_normals = new Array();
};
$hxClasses["box2D.collision.shapes.B2PolygonShape"] = box2D.collision.shapes.B2PolygonShape;
box2D.collision.shapes.B2PolygonShape.__name__ = true;
box2D.collision.shapes.B2PolygonShape.__super__ = box2D.collision.shapes.B2Shape;
box2D.collision.shapes.B2PolygonShape.prototype = $extend(box2D.collision.shapes.B2Shape.prototype,{
	reserve: function(count) {
		var _g = this.m_vertices.length;
		while(_g < count) {
			var i = _g++;
			this.m_vertices[i] = new box2D.common.math.B2Vec2();
			this.m_normals[i] = new box2D.common.math.B2Vec2();
		}
	}
	,getVertices: function() {
		return this.m_vertices;
	}
	,getVertexCount: function() {
		return this.m_vertexCount;
	}
	,computeMass: function(massData,density) {
		if(this.m_vertexCount == 2) {
			massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
			massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
			massData.mass = 0.0;
			massData.I = 0.0;
			return;
		}
		var centerX = 0.0;
		var centerY = 0.0;
		var area = 0.0;
		var I = 0.0;
		var p1X = 0.0;
		var p1Y = 0.0;
		var k_inv3 = 1.0 / 3.0;
		var _g1 = 0, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			var p2 = this.m_vertices[i];
			var p3 = i + 1 < this.m_vertexCount?this.m_vertices[Std["int"](i + 1)]:this.m_vertices[0];
			var e1X = p2.x - p1X;
			var e1Y = p2.y - p1Y;
			var e2X = p3.x - p1X;
			var e2Y = p3.y - p1Y;
			var D = e1X * e2Y - e1Y * e2X;
			var triangleArea = 0.5 * D;
			area += triangleArea;
			centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
			centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
			var px = p1X;
			var py = p1Y;
			var ex1 = e1X;
			var ey1 = e1Y;
			var ex2 = e2X;
			var ey2 = e2Y;
			var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
			var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
			I += D * (intx2 + inty2);
		}
		massData.mass = density * area;
		centerX *= 1.0 / area;
		centerY *= 1.0 / area;
		massData.center.set(centerX,centerY);
		massData.I = density * I;
	}
	,computeAABB: function(aabb,xf) {
		var tMat = xf.R;
		var tVec = this.m_vertices[0];
		var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
		var upperX = lowerX;
		var upperY = lowerY;
		var _g1 = 1, _g = this.m_vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			tVec = this.m_vertices[i];
			var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			lowerX = lowerX < vX?lowerX:vX;
			lowerY = lowerY < vY?lowerY:vY;
			upperX = upperX > vX?upperX:vX;
			upperY = upperY > vY?upperY:vY;
		}
		aabb.lowerBound.x = lowerX - this.m_radius;
		aabb.lowerBound.y = lowerY - this.m_radius;
		aabb.upperBound.x = upperX + this.m_radius;
		aabb.upperBound.y = upperY + this.m_radius;
	}
	,setAsEdge: function(v1,v2) {
		this.m_vertexCount = 2;
		this.reserve(2);
		this.m_vertices[0].setV(v1);
		this.m_vertices[1].setV(v2);
		this.m_centroid.x = 0.5 * (v1.x + v2.x);
		this.m_centroid.y = 0.5 * (v1.y + v2.y);
		this.m_normals[0] = box2D.common.math.B2Math.crossVF(box2D.common.math.B2Math.subtractVV(v2,v1),1.0);
		this.m_normals[0].normalize();
		this.m_normals[1].x = -this.m_normals[0].x;
		this.m_normals[1].y = -this.m_normals[0].y;
	}
	,setAsBox: function(hx,hy) {
		this.m_vertexCount = 4;
		this.reserve(4);
		this.m_vertices[0].set(-hx,-hy);
		this.m_vertices[1].set(hx,-hy);
		this.m_vertices[2].set(hx,hy);
		this.m_vertices[3].set(-hx,hy);
		this.m_normals[0].set(0.0,-1.0);
		this.m_normals[1].set(1.0,0.0);
		this.m_normals[2].set(0.0,1.0);
		this.m_normals[3].set(-1.0,0.0);
		this.m_centroid.setZero();
	}
	,set: function(other) {
		box2D.collision.shapes.B2Shape.prototype.set.call(this,other);
		if(Std["is"](other,box2D.collision.shapes.B2PolygonShape)) {
			var other2 = js.Boot.__cast(other , box2D.collision.shapes.B2PolygonShape);
			this.m_centroid.setV(other2.m_centroid);
			this.m_vertexCount = other2.m_vertexCount;
			this.reserve(this.m_vertexCount);
			var _g1 = 0, _g = this.m_vertexCount;
			while(_g1 < _g) {
				var i = _g1++;
				this.m_vertices[i].setV(other2.m_vertices[i]);
				this.m_normals[i].setV(other2.m_normals[i]);
			}
		}
	}
	,copy: function() {
		var s = new box2D.collision.shapes.B2PolygonShape();
		s.set(this);
		return s;
	}
	,__class__: box2D.collision.shapes.B2PolygonShape
});
box2D.collision.shapes.B2ShapeType = $hxClasses["box2D.collision.shapes.B2ShapeType"] = { __ename__ : true, __constructs__ : ["UNKNOWN_SHAPE","CIRCLE_SHAPE","POLYGON_SHAPE","EDGE_SHAPE"] }
box2D.collision.shapes.B2ShapeType.UNKNOWN_SHAPE = ["UNKNOWN_SHAPE",0];
box2D.collision.shapes.B2ShapeType.UNKNOWN_SHAPE.toString = $estr;
box2D.collision.shapes.B2ShapeType.UNKNOWN_SHAPE.__enum__ = box2D.collision.shapes.B2ShapeType;
box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE = ["CIRCLE_SHAPE",1];
box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE.toString = $estr;
box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE.__enum__ = box2D.collision.shapes.B2ShapeType;
box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE = ["POLYGON_SHAPE",2];
box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE.toString = $estr;
box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE.__enum__ = box2D.collision.shapes.B2ShapeType;
box2D.collision.shapes.B2ShapeType.EDGE_SHAPE = ["EDGE_SHAPE",3];
box2D.collision.shapes.B2ShapeType.EDGE_SHAPE.toString = $estr;
box2D.collision.shapes.B2ShapeType.EDGE_SHAPE.__enum__ = box2D.collision.shapes.B2ShapeType;
box2D.common.B2Color = function(rr,gg,bb) {
	this._r = Std["int"](255 * box2D.common.math.B2Math.clamp(rr,0.0,1.0));
	this._g = Std["int"](255 * box2D.common.math.B2Math.clamp(gg,0.0,1.0));
	this._b = Std["int"](255 * box2D.common.math.B2Math.clamp(bb,0.0,1.0));
};
$hxClasses["box2D.common.B2Color"] = box2D.common.B2Color;
box2D.common.B2Color.__name__ = true;
box2D.common.B2Color.prototype = {
	set: function(rr,gg,bb) {
		this._r = Std["int"](255 * box2D.common.math.B2Math.clamp(rr,0.0,1.0));
		this._g = Std["int"](255 * box2D.common.math.B2Math.clamp(gg,0.0,1.0));
		this._b = Std["int"](255 * box2D.common.math.B2Math.clamp(bb,0.0,1.0));
	}
	,__class__: box2D.common.B2Color
}
box2D.common.B2Settings = function() { }
$hxClasses["box2D.common.B2Settings"] = box2D.common.B2Settings;
box2D.common.B2Settings.__name__ = true;
box2D.common.B2Settings.b2MixFriction = function(friction1,friction2) {
	return Math.sqrt(friction1 * friction2);
}
box2D.common.B2Settings.b2MixRestitution = function(restitution1,restitution2) {
	return restitution1 > restitution2?restitution1:restitution2;
}
box2D.common.B2Settings.b2Assert = function(a) {
	if(!a) throw "Assertion Failed";
}
box2D.common.math.B2Math = function() { }
$hxClasses["box2D.common.math.B2Math"] = box2D.common.math.B2Math;
box2D.common.math.B2Math.__name__ = true;
box2D.common.math.B2Math.dot = function(a,b) {
	return a.x * b.x + a.y * b.y;
}
box2D.common.math.B2Math.crossVV = function(a,b) {
	return a.x * b.y - a.y * b.x;
}
box2D.common.math.B2Math.crossVF = function(a,s) {
	var v = new box2D.common.math.B2Vec2(s * a.y,-s * a.x);
	return v;
}
box2D.common.math.B2Math.crossFV = function(s,a) {
	var v = new box2D.common.math.B2Vec2(-s * a.y,s * a.x);
	return v;
}
box2D.common.math.B2Math.mulMV = function(A,v) {
	var u = new box2D.common.math.B2Vec2(A.col1.x * v.x + A.col2.x * v.y,A.col1.y * v.x + A.col2.y * v.y);
	return u;
}
box2D.common.math.B2Math.mulTMV = function(A,v) {
	var u = new box2D.common.math.B2Vec2(box2D.common.math.B2Math.dot(v,A.col1),box2D.common.math.B2Math.dot(v,A.col2));
	return u;
}
box2D.common.math.B2Math.mulX = function(T,v) {
	var a = box2D.common.math.B2Math.mulMV(T.R,v);
	a.x += T.position.x;
	a.y += T.position.y;
	return a;
}
box2D.common.math.B2Math.subtractVV = function(a,b) {
	var v = new box2D.common.math.B2Vec2(a.x - b.x,a.y - b.y);
	return v;
}
box2D.common.math.B2Math.abs = function(a) {
	return a > 0.0?a:-a;
}
box2D.common.math.B2Math.min = function(a,b) {
	return a < b?a:b;
}
box2D.common.math.B2Math.max = function(a,b) {
	return a > b?a:b;
}
box2D.common.math.B2Math.clamp = function(a,low,high) {
	return a < low?low:a > high?high:a;
}
box2D.common.math.B2Math.get_MIN_VALUE = function() {
	return Number.MIN_VALUE;
}
box2D.common.math.B2Math.get_MAX_VALUE = function() {
	return Number.MAX_VALUE;
}
box2D.common.math.B2Sweep = function() {
	this.localCenter = new box2D.common.math.B2Vec2();
	this.c0 = new box2D.common.math.B2Vec2();
	this.c = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.common.math.B2Sweep"] = box2D.common.math.B2Sweep;
box2D.common.math.B2Sweep.__name__ = true;
box2D.common.math.B2Sweep.prototype = {
	advance: function(t) {
		if(this.t0 < t && 1.0 - this.t0 > box2D.common.math.B2Math.get_MIN_VALUE()) {
			var alpha = (t - this.t0) / (1.0 - this.t0);
			this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
			this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
			this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
			this.t0 = t;
		}
	}
	,getTransform: function(xf,alpha) {
		xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
		xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
		var angle = (1.0 - alpha) * this.a0 + alpha * this.a;
		xf.R.set(angle);
		var tMat = xf.R;
		xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
		xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y;
	}
	,set: function(other) {
		this.localCenter.setV(other.localCenter);
		this.c0.setV(other.c0);
		this.c.setV(other.c);
		this.a0 = other.a0;
		this.a = other.a;
		this.t0 = other.t0;
	}
	,__class__: box2D.common.math.B2Sweep
}
box2D.dynamics = {}
box2D.dynamics.B2Body = function(bd,world) {
	this.name = "";
	this.m_xf = new box2D.common.math.B2Transform();
	this.m_sweep = new box2D.common.math.B2Sweep();
	this.m_linearVelocity = new box2D.common.math.B2Vec2();
	this.m_force = new box2D.common.math.B2Vec2();
	this.m_flags = 0;
	if(bd.bullet) this.m_flags |= box2D.dynamics.B2Body.e_bulletFlag;
	if(bd.fixedRotation) this.m_flags |= box2D.dynamics.B2Body.e_fixedRotationFlag;
	if(bd.allowSleep) this.m_flags |= box2D.dynamics.B2Body.e_allowSleepFlag;
	if(bd.awake) this.m_flags |= box2D.dynamics.B2Body.e_awakeFlag;
	if(bd.active) this.m_flags |= box2D.dynamics.B2Body.e_activeFlag;
	this.m_world = world;
	this.m_xf.position.setV(bd.position);
	this.m_xf.R.set(bd.angle);
	this.m_sweep.localCenter.setZero();
	this.m_sweep.t0 = 1.0;
	this.m_sweep.a0 = this.m_sweep.a = bd.angle;
	var tMat = this.m_xf.R;
	var tVec = this.m_sweep.localCenter;
	this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	this.m_sweep.c.x += this.m_xf.position.x;
	this.m_sweep.c.y += this.m_xf.position.y;
	this.m_sweep.c0.setV(this.m_sweep.c);
	this.m_jointList = null;
	this.m_controllerList = null;
	this.m_contactList = null;
	this.m_controllerCount = 0;
	this.m_prev = null;
	this.m_next = null;
	this.m_linearVelocity.setV(bd.linearVelocity);
	this.m_angularVelocity = bd.angularVelocity;
	this.m_linearDamping = bd.linearDamping;
	this.m_angularDamping = bd.angularDamping;
	this.m_force.set(0.0,0.0);
	this.m_torque = 0.0;
	this.m_sleepTime = 0.0;
	this.m_type = bd.type;
	if(this.m_type == box2D.dynamics.B2Body.b2_dynamicBody) {
		this.m_mass = 1.0;
		this.m_invMass = 1.0;
	} else {
		this.m_mass = 0.0;
		this.m_invMass = 0.0;
	}
	this.m_I = 0.0;
	this.m_invI = 0.0;
	this.m_inertiaScale = bd.inertiaScale;
	this.m_userData = bd.userData;
	this.m_fixtureList = null;
	this.m_fixtureCount = 0;
};
$hxClasses["box2D.dynamics.B2Body"] = box2D.dynamics.B2Body;
box2D.dynamics.B2Body.__name__ = true;
box2D.dynamics.B2Body.prototype = {
	advance: function(t) {
		this.m_sweep.advance(t);
		this.m_sweep.c.setV(this.m_sweep.c0);
		this.m_sweep.a = this.m_sweep.a0;
		this.synchronizeTransform();
	}
	,shouldCollide: function(other) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody && other.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return false;
		var jn = this.m_jointList;
		while(jn != null) {
			if(jn.other == other) {
				if(jn.joint.m_collideConnected == false) return false;
			}
			jn = jn.next;
		}
		return true;
	}
	,synchronizeTransform: function() {
		this.m_xf.R.set(this.m_sweep.a);
		var tMat = this.m_xf.R;
		var tVec = this.m_sweep.localCenter;
		this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	}
	,synchronizeFixtures: function() {
		var xf1 = box2D.dynamics.B2Body.s_xf1;
		xf1.R.set(this.m_sweep.a0);
		var tMat = xf1.R;
		var tVec = this.m_sweep.localCenter;
		xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
		xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
		var f;
		var broadPhase = this.m_world.m_contactManager.m_broadPhase;
		f = this.m_fixtureList;
		while(f != null) {
			f.synchronize(broadPhase,xf1,this.m_xf);
			f = f.m_next;
		}
	}
	,getWorld: function() {
		return this.m_world;
	}
	,setUserData: function(data) {
		this.m_userData = data;
	}
	,getUserData: function() {
		return this.m_userData;
	}
	,getNext: function() {
		return this.m_next;
	}
	,getContactList: function() {
		return this.m_contactList;
	}
	,getFixtureList: function() {
		return this.m_fixtureList;
	}
	,isActive: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_activeFlag) == box2D.dynamics.B2Body.e_activeFlag;
	}
	,setFixedRotation: function(fixed) {
		if(fixed) this.m_flags |= box2D.dynamics.B2Body.e_fixedRotationFlag; else this.m_flags &= ~box2D.dynamics.B2Body.e_fixedRotationFlag;
		this.resetMassData();
	}
	,isAwake: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_awakeFlag) == box2D.dynamics.B2Body.e_awakeFlag;
	}
	,setAwake: function(flag) {
		if(flag) {
			this.m_flags |= box2D.dynamics.B2Body.e_awakeFlag;
			this.m_sleepTime = 0.0;
		} else {
			this.m_flags &= ~box2D.dynamics.B2Body.e_awakeFlag;
			this.m_sleepTime = 0.0;
			this.m_linearVelocity.setZero();
			this.m_angularVelocity = 0.0;
			this.m_force.setZero();
			this.m_torque = 0.0;
		}
	}
	,setSleepingAllowed: function(flag) {
		if(flag) this.m_flags |= box2D.dynamics.B2Body.e_allowSleepFlag; else {
			this.m_flags &= ~box2D.dynamics.B2Body.e_allowSleepFlag;
			this.setAwake(true);
		}
	}
	,isBullet: function() {
		return (this.m_flags & box2D.dynamics.B2Body.e_bulletFlag) == box2D.dynamics.B2Body.e_bulletFlag;
	}
	,getType: function() {
		return this.m_type;
	}
	,getLinearVelocityFromWorldPoint: function(worldPoint) {
		return new box2D.common.math.B2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y),this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
	}
	,getLocalVector: function(worldVector) {
		return box2D.common.math.B2Math.mulTMV(this.m_xf.R,worldVector);
	}
	,getWorldPoint: function(localPoint) {
		var A = this.m_xf.R;
		var u = new box2D.common.math.B2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y,A.col1.y * localPoint.x + A.col2.y * localPoint.y);
		u.x += this.m_xf.position.x;
		u.y += this.m_xf.position.y;
		return u;
	}
	,resetMassData: function() {
		this.m_mass = 0.0;
		this.m_invMass = 0.0;
		this.m_I = 0.0;
		this.m_invI = 0.0;
		this.m_sweep.localCenter.setZero();
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody || this.m_type == box2D.dynamics.B2Body.b2_kinematicBody) return;
		var center = box2D.common.math.B2Vec2.make(0,0);
		var f = this.m_fixtureList;
		while(f != null) {
			if(f.m_density == 0.0) continue;
			var massData = f.getMassData();
			this.m_mass += massData.mass;
			center.x += massData.center.x * massData.mass;
			center.y += massData.center.y * massData.mass;
			this.m_I += massData.I;
			f = f.m_next;
		}
		if(this.m_mass > 0.0) {
			this.m_invMass = 1.0 / this.m_mass;
			center.x *= this.m_invMass;
			center.y *= this.m_invMass;
		} else {
			this.m_mass = 1.0;
			this.m_invMass = 1.0;
		}
		if(this.m_I > 0.0 && (this.m_flags & box2D.dynamics.B2Body.e_fixedRotationFlag) == 0) {
			this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
			this.m_I *= this.m_inertiaScale;
			box2D.common.B2Settings.b2Assert(this.m_I > 0);
			this.m_invI = 1.0 / this.m_I;
		} else {
			this.m_I = 0.0;
			this.m_invI = 0.0;
		}
		var oldCenter = this.m_sweep.c.copy();
		this.m_sweep.localCenter.setV(center);
		this.m_sweep.c0.setV(box2D.common.math.B2Math.mulX(this.m_xf,this.m_sweep.localCenter));
		this.m_sweep.c.setV(this.m_sweep.c0);
		this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
		this.m_linearVelocity.y += this.m_angularVelocity * (this.m_sweep.c.x - oldCenter.x);
	}
	,applyImpulse: function(impulse,point) {
		if(this.m_type != box2D.dynamics.B2Body.b2_dynamicBody) return;
		if(this.isAwake() == false) this.setAwake(true);
		this.m_linearVelocity.x += this.m_invMass * impulse.x;
		this.m_linearVelocity.y += this.m_invMass * impulse.y;
		this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
	}
	,getLinearVelocity: function() {
		return this.m_linearVelocity;
	}
	,setLinearVelocity: function(v) {
		if(this.m_type == box2D.dynamics.B2Body.b2_staticBody) return;
		this.m_linearVelocity.setV(v);
	}
	,getWorldCenter: function() {
		return this.m_sweep.c;
	}
	,getAngle: function() {
		return this.m_sweep.a;
	}
	,getPosition: function() {
		return this.m_xf.position;
	}
	,getTransform: function() {
		return this.m_xf;
	}
	,createFixture: function(def) {
		if(this.m_world.isLocked() == true) return null;
		var fixture = new box2D.dynamics.B2Fixture();
		fixture.create(this,this.m_xf,def);
		if((this.m_flags & box2D.dynamics.B2Body.e_activeFlag) != 0) {
			var broadPhase = this.m_world.m_contactManager.m_broadPhase;
			fixture.createProxy(broadPhase,this.m_xf);
		}
		fixture.m_next = this.m_fixtureList;
		this.m_fixtureList = fixture;
		++this.m_fixtureCount;
		fixture.m_body = this;
		if(fixture.m_density > 0.0) this.resetMassData();
		this.m_world.m_flags |= box2D.dynamics.B2World.e_newFixture;
		return fixture;
	}
	,__class__: box2D.dynamics.B2Body
}
box2D.dynamics.B2BodyDef = function() {
	this.position = new box2D.common.math.B2Vec2();
	this.linearVelocity = new box2D.common.math.B2Vec2();
	this.userData = null;
	this.angle = 0.0;
	this.angularVelocity = 0.0;
	this.linearDamping = 0.0;
	this.angularDamping = 0.0;
	this.allowSleep = true;
	this.awake = true;
	this.fixedRotation = false;
	this.bullet = false;
	this.type = box2D.dynamics.B2Body.b2_staticBody;
	this.active = true;
	this.inertiaScale = 1.0;
};
$hxClasses["box2D.dynamics.B2BodyDef"] = box2D.dynamics.B2BodyDef;
box2D.dynamics.B2BodyDef.__name__ = true;
box2D.dynamics.B2BodyDef.prototype = {
	__class__: box2D.dynamics.B2BodyDef
}
box2D.dynamics.B2ContactFilter = function() {
};
$hxClasses["box2D.dynamics.B2ContactFilter"] = box2D.dynamics.B2ContactFilter;
box2D.dynamics.B2ContactFilter.__name__ = true;
box2D.dynamics.B2ContactFilter.prototype = {
	shouldCollide: function(fixtureA,fixtureB) {
		var filter1 = fixtureA.getFilterData();
		var filter2 = fixtureB.getFilterData();
		if(filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) return filter1.groupIndex > 0;
		var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
		return collide;
	}
	,__class__: box2D.dynamics.B2ContactFilter
}
box2D.dynamics.B2ContactImpulse = function() {
	this.normalImpulses = new Array();
	this.tangentImpulses = new Array();
};
$hxClasses["box2D.dynamics.B2ContactImpulse"] = box2D.dynamics.B2ContactImpulse;
box2D.dynamics.B2ContactImpulse.__name__ = true;
box2D.dynamics.B2ContactImpulse.prototype = {
	__class__: box2D.dynamics.B2ContactImpulse
}
box2D.dynamics.B2ContactListener = function() {
};
$hxClasses["box2D.dynamics.B2ContactListener"] = box2D.dynamics.B2ContactListener;
box2D.dynamics.B2ContactListener.__name__ = true;
box2D.dynamics.B2ContactListener.prototype = {
	postSolve: function(contact,impulse) {
	}
	,preSolve: function(contact,oldManifold) {
	}
	,endContact: function(contact) {
	}
	,beginContact: function(contact) {
	}
	,__class__: box2D.dynamics.B2ContactListener
}
box2D.dynamics.B2ContactManager = function() {
	this.m_world = null;
	this.m_contactCount = 0;
	this.m_contactFilter = box2D.dynamics.B2ContactFilter.b2_defaultFilter;
	this.m_contactListener = box2D.dynamics.B2ContactListener.b2_defaultListener;
	this.m_contactFactory = new box2D.dynamics.contacts.B2ContactFactory(this.m_allocator);
	this.m_broadPhase = new box2D.collision.B2DynamicTreeBroadPhase();
};
$hxClasses["box2D.dynamics.B2ContactManager"] = box2D.dynamics.B2ContactManager;
box2D.dynamics.B2ContactManager.__name__ = true;
box2D.dynamics.B2ContactManager.prototype = {
	collide: function() {
		var c = this.m_world.m_contactList;
		while(c != null) {
			var fixtureA = c.getFixtureA();
			var fixtureB = c.getFixtureB();
			var bodyA = fixtureA.getBody();
			var bodyB = fixtureB.getBody();
			if(bodyA.isAwake() == false && bodyB.isAwake() == false) {
				c = c.getNext();
				continue;
			}
			if((c.m_flags & box2D.dynamics.contacts.B2Contact.e_filterFlag) != 0) {
				if(bodyB.shouldCollide(bodyA) == false) {
					var cNuke = c;
					c = cNuke.getNext();
					this.destroy(cNuke);
					continue;
				}
				if(this.m_contactFilter.shouldCollide(fixtureA,fixtureB) == false) {
					var cNuke = c;
					c = cNuke.getNext();
					this.destroy(cNuke);
					continue;
				}
				c.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_filterFlag;
			}
			var proxyA = fixtureA.m_proxy;
			var proxyB = fixtureB.m_proxy;
			var overlap = this.m_broadPhase.testOverlap(proxyA,proxyB);
			if(overlap == false) {
				var cNuke = c;
				c = cNuke.getNext();
				this.destroy(cNuke);
				continue;
			}
			c.update(this.m_contactListener);
			c = c.getNext();
		}
	}
	,destroy: function(c) {
		var fixtureA = c.getFixtureA();
		var fixtureB = c.getFixtureB();
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(c.isTouching()) this.m_contactListener.endContact(c);
		if(c.m_prev != null) c.m_prev.m_next = c.m_next;
		if(c.m_next != null) c.m_next.m_prev = c.m_prev;
		if(c == this.m_world.m_contactList) this.m_world.m_contactList = c.m_next;
		if(c.m_nodeA.prev != null) c.m_nodeA.prev.next = c.m_nodeA.next;
		if(c.m_nodeA.next != null) c.m_nodeA.next.prev = c.m_nodeA.prev;
		if(c.m_nodeA == bodyA.m_contactList) bodyA.m_contactList = c.m_nodeA.next;
		if(c.m_nodeB.prev != null) c.m_nodeB.prev.next = c.m_nodeB.next;
		if(c.m_nodeB.next != null) c.m_nodeB.next.prev = c.m_nodeB.prev;
		if(c.m_nodeB == bodyB.m_contactList) bodyB.m_contactList = c.m_nodeB.next;
		this.m_contactFactory.destroy(c);
		--this.m_contactCount;
	}
	,findNewContacts: function() {
		this.m_broadPhase.updatePairs($bind(this,this.addPair));
	}
	,addPair: function(proxyUserDataA,proxyUserDataB) {
		var fixtureA = js.Boot.__cast(proxyUserDataA , box2D.dynamics.B2Fixture);
		var fixtureB = js.Boot.__cast(proxyUserDataB , box2D.dynamics.B2Fixture);
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(bodyA == bodyB) return;
		var edge = bodyB.getContactList();
		while(edge != null) {
			if(edge.other == bodyA) {
				var fA = edge.contact.getFixtureA();
				var fB = edge.contact.getFixtureB();
				if(fA == fixtureA && fB == fixtureB) return;
				if(fA == fixtureB && fB == fixtureA) return;
			}
			edge = edge.next;
		}
		if(bodyB.shouldCollide(bodyA) == false) return;
		if(this.m_contactFilter.shouldCollide(fixtureA,fixtureB) == false) return;
		var c = this.m_contactFactory.create(fixtureA,fixtureB);
		fixtureA = c.getFixtureA();
		fixtureB = c.getFixtureB();
		bodyA = fixtureA.m_body;
		bodyB = fixtureB.m_body;
		c.m_prev = null;
		c.m_next = this.m_world.m_contactList;
		if(this.m_world.m_contactList != null) this.m_world.m_contactList.m_prev = c;
		this.m_world.m_contactList = c;
		c.m_nodeA.contact = c;
		c.m_nodeA.other = bodyB;
		c.m_nodeA.prev = null;
		c.m_nodeA.next = bodyA.m_contactList;
		if(bodyA.m_contactList != null) bodyA.m_contactList.prev = c.m_nodeA;
		bodyA.m_contactList = c.m_nodeA;
		c.m_nodeB.contact = c;
		c.m_nodeB.other = bodyA;
		c.m_nodeB.prev = null;
		c.m_nodeB.next = bodyB.m_contactList;
		if(bodyB.m_contactList != null) bodyB.m_contactList.prev = c.m_nodeB;
		bodyB.m_contactList = c.m_nodeB;
		++this.m_world.m_contactCount;
		return;
	}
	,__class__: box2D.dynamics.B2ContactManager
}
box2D.dynamics.B2DebugDraw = function() {
	this.m_drawScale = 1.0;
	this.m_lineThickness = 1.0;
	this.m_alpha = 1.0;
	this.m_fillAlpha = 1.0;
	this.m_xformScale = 1.0;
	this.m_drawFlags = 0;
};
$hxClasses["box2D.dynamics.B2DebugDraw"] = box2D.dynamics.B2DebugDraw;
box2D.dynamics.B2DebugDraw.__name__ = true;
box2D.dynamics.B2DebugDraw.prototype = {
	drawTransform: function(xf) {
		this.m_sprite.drawTransform(xf,this.m_drawScale);
	}
	,drawSegment: function(p1,p2,color) {
		this.m_sprite.drawSegment(p1,p2,color,this.m_drawScale);
	}
	,drawCircle: function(center,radius,color) {
		this.m_sprite.drawCircle(center,radius,color,this.m_drawScale);
	}
	,drawPolygon: function(vertices,vertexCount,color) {
		this.m_sprite.drawPolygon(vertices,vertexCount,color,this.m_drawScale);
	}
	,setDrawScale: function(drawScale) {
		this.m_drawScale = drawScale;
	}
	,getSprite: function() {
		return this.m_sprite;
	}
	,setSprite: function(sprite) {
		this.m_sprite = sprite;
	}
	,getFlags: function() {
		return this.m_drawFlags;
	}
	,setFlags: function(flags) {
		this.m_drawFlags = flags;
	}
	,__class__: box2D.dynamics.B2DebugDraw
}
box2D.dynamics.B2DebugSprite = function() {
	this.translateX = 0;
	this.canvas = flambe.System.createTexture(box2D.dynamics.B2DebugSprite.TEXTURE_WIDTH,box2D.dynamics.B2DebugSprite.TEXTURE_HEIGHT);
	this.canvas.get_graphics().translate(box2D.dynamics.B2DebugSprite.OFFSET_X,box2D.dynamics.B2DebugSprite.OFFSET_Y);
	this.rec = new flambe.math.Rectangle();
	this.rec.width = flambe.System.get_stage().get_width();
	this.rec.height = flambe.System.get_stage().get_height();
};
$hxClasses["box2D.dynamics.B2DebugSprite"] = box2D.dynamics.B2DebugSprite;
box2D.dynamics.B2DebugSprite.__name__ = true;
box2D.dynamics.B2DebugSprite.prototype = {
	clear: function() {
		this.canvas.get_graphics().clear(new flambe.math.Rectangle(-this.translateX - box2D.dynamics.B2DebugSprite.OFFSET_X,-box2D.dynamics.B2DebugSprite.OFFSET_Y,box2D.dynamics.B2DebugSprite.TEXTURE_WIDTH,box2D.dynamics.B2DebugSprite.TEXTURE_HEIGHT));
	}
	,drawPolygon: function(vertices,vertexCount,color,drawScale) {
		var s = this.canvas.get_graphics();
		s.beginPath();
		s.moveTo(vertices[0].x * drawScale,vertices[0].y * drawScale);
		var _g = 1;
		while(_g < vertexCount) {
			var i = _g++;
			s.lineTo(vertices[i].x * drawScale,vertices[i].y * drawScale);
		}
		s.lineTo(vertices[0].x * drawScale,vertices[0].y * drawScale);
		s.closePath();
		s.stroke();
	}
	,drawCircle: function(center,radius,color,drawScale) {
		var s = this.canvas.get_graphics();
		s.beginPath();
		s.arc(center.x * drawScale,center.y * drawScale,radius * drawScale,0,Math.PI * 2,true);
		s.closePath();
		s.stroke();
	}
	,drawSegment: function(p1,p2,color,drawScale) {
		var s = this.canvas.get_graphics();
		s.beginPath();
		s.moveTo(p1.x * drawScale,p1.y * drawScale);
		s.lineTo(p2.x * drawScale,p2.y * drawScale);
		s.closePath();
		s.stroke();
	}
	,drawTransform: function(xf,drawScale) {
		var s = this.canvas.get_graphics();
		s.beginPath();
		s.moveTo(xf.position.x * drawScale,xf.position.y * drawScale);
		s.lineTo((xf.position.x + 1 * xf.R.col1.x) * drawScale,(xf.position.y + 1 * xf.R.col1.y) * drawScale);
		s.moveTo(xf.position.x * drawScale,xf.position.y * drawScale);
		s.lineTo((xf.position.x + 1 * xf.R.col2.x) * drawScale,(xf.position.y + 1 * xf.R.col2.y) * drawScale);
		s.closePath();
		s.stroke();
	}
	,__class__: box2D.dynamics.B2DebugSprite
}
box2D.dynamics.B2DestructionListener = function() { }
$hxClasses["box2D.dynamics.B2DestructionListener"] = box2D.dynamics.B2DestructionListener;
box2D.dynamics.B2DestructionListener.__name__ = true;
box2D.dynamics.B2DestructionListener.prototype = {
	sayGoodbyeFixture: function(fixture) {
	}
	,sayGoodbyeJoint: function(joint) {
	}
	,__class__: box2D.dynamics.B2DestructionListener
}
box2D.dynamics.B2FilterData = function() {
	this.categoryBits = 1;
	this.maskBits = 65535;
	this.groupIndex = 0;
};
$hxClasses["box2D.dynamics.B2FilterData"] = box2D.dynamics.B2FilterData;
box2D.dynamics.B2FilterData.__name__ = true;
box2D.dynamics.B2FilterData.prototype = {
	copy: function() {
		var copy = new box2D.dynamics.B2FilterData();
		copy.categoryBits = this.categoryBits;
		copy.maskBits = this.maskBits;
		copy.groupIndex = this.groupIndex;
		return copy;
	}
	,__class__: box2D.dynamics.B2FilterData
}
box2D.dynamics.B2Fixture = function() {
	this.m_filter = new box2D.dynamics.B2FilterData();
	this.m_aabb = new box2D.collision.B2AABB();
	this.m_userData = null;
	this.m_body = null;
	this.m_next = null;
	this.m_shape = null;
	this.m_density = 0.0;
	this.m_friction = 0.0;
	this.m_restitution = 0.0;
};
$hxClasses["box2D.dynamics.B2Fixture"] = box2D.dynamics.B2Fixture;
box2D.dynamics.B2Fixture.__name__ = true;
box2D.dynamics.B2Fixture.prototype = {
	synchronize: function(broadPhase,transform1,transform2) {
		if(this.m_proxy == null) return;
		var aabb1 = new box2D.collision.B2AABB();
		var aabb2 = new box2D.collision.B2AABB();
		this.m_shape.computeAABB(aabb1,transform1);
		this.m_shape.computeAABB(aabb2,transform2);
		this.m_aabb.combine(aabb1,aabb2);
		var displacement = box2D.common.math.B2Math.subtractVV(transform2.position,transform1.position);
		broadPhase.moveProxy(this.m_proxy,this.m_aabb,displacement);
	}
	,destroyProxy: function(broadPhase) {
		if(this.m_proxy == null) return;
		broadPhase.destroyProxy(this.m_proxy);
		this.m_proxy = null;
	}
	,createProxy: function(broadPhase,xf) {
		this.m_shape.computeAABB(this.m_aabb,xf);
		this.m_proxy = broadPhase.createProxy(this.m_aabb,this);
	}
	,destroy: function() {
		this.m_shape = null;
	}
	,create: function(body,xf,def) {
		this.m_userData = def.userData;
		this.m_friction = def.friction;
		this.m_restitution = def.restitution;
		this.m_body = body;
		this.m_next = null;
		this.m_filter = def.filter.copy();
		this.m_isSensor = def.isSensor;
		this.m_shape = def.shape.copy();
		this.m_density = def.density;
	}
	,getAABB: function() {
		return this.m_aabb;
	}
	,getRestitution: function() {
		return this.m_restitution;
	}
	,getFriction: function() {
		return this.m_friction;
	}
	,getMassData: function(massData) {
		if(massData == null) massData = new box2D.collision.shapes.B2MassData();
		this.m_shape.computeMass(massData,this.m_density);
		return massData;
	}
	,getNext: function() {
		return this.m_next;
	}
	,getBody: function() {
		return this.m_body;
	}
	,getFilterData: function() {
		return this.m_filter.copy();
	}
	,isSensor: function() {
		return this.m_isSensor;
	}
	,getShape: function() {
		return this.m_shape;
	}
	,getType: function() {
		return this.m_shape.getType();
	}
	,__class__: box2D.dynamics.B2Fixture
}
box2D.dynamics.B2FixtureDef = function() {
	this.filter = new box2D.dynamics.B2FilterData();
	this.shape = null;
	this.userData = null;
	this.friction = 0.2;
	this.restitution = 0.0;
	this.density = 0.0;
	this.filter.categoryBits = 1;
	this.filter.maskBits = 65535;
	this.filter.groupIndex = 0;
	this.isSensor = false;
};
$hxClasses["box2D.dynamics.B2FixtureDef"] = box2D.dynamics.B2FixtureDef;
box2D.dynamics.B2FixtureDef.__name__ = true;
box2D.dynamics.B2FixtureDef.prototype = {
	__class__: box2D.dynamics.B2FixtureDef
}
box2D.dynamics.B2Image = function() { }
$hxClasses["box2D.dynamics.B2Image"] = box2D.dynamics.B2Image;
box2D.dynamics.B2Image.__name__ = true;
box2D.dynamics.B2Island = function() {
	this.m_bodies = new Array();
	this.m_contacts = new Array();
	this.m_joints = new Array();
};
$hxClasses["box2D.dynamics.B2Island"] = box2D.dynamics.B2Island;
box2D.dynamics.B2Island.__name__ = true;
box2D.dynamics.B2Island.prototype = {
	addJoint: function(joint) {
		this.m_joints[this.m_jointCount++] = joint;
	}
	,addContact: function(contact) {
		this.m_contacts[this.m_contactCount++] = contact;
	}
	,addBody: function(body) {
		body.m_islandIndex = this.m_bodyCount;
		this.m_bodies[this.m_bodyCount++] = body;
	}
	,report: function(constraints) {
		if(this.m_listener == null) return;
		var _g1 = 0, _g = this.m_contactCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_contacts[i];
			var cc = constraints[i];
			var _g3 = 0, _g2 = cc.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				box2D.dynamics.B2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
				box2D.dynamics.B2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
			}
			this.m_listener.postSolve(c,box2D.dynamics.B2Island.s_impulse);
		}
	}
	,solveTOI: function(subStep) {
		var i;
		var j;
		this.m_contactSolver.initialize(subStep,this.m_contacts,this.m_contactCount,this.m_allocator);
		var contactSolver = this.m_contactSolver;
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			this.m_joints[i1].initVelocityConstraints(subStep);
		}
		var _g1 = 0, _g = subStep.velocityIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			contactSolver.solveVelocityConstraints();
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				this.m_joints[j1].solveVelocityConstraints(subStep);
			}
		}
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			var b = this.m_bodies[i1];
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
			var translationX = subStep.dt * b.m_linearVelocity.x;
			var translationY = subStep.dt * b.m_linearVelocity.y;
			if(translationX * translationX + translationY * translationY > box2D.common.B2Settings.b2_maxTranslationSquared) {
				b.m_linearVelocity.normalize();
				b.m_linearVelocity.x *= box2D.common.B2Settings.b2_maxTranslation * subStep.inv_dt;
				b.m_linearVelocity.y *= box2D.common.B2Settings.b2_maxTranslation * subStep.inv_dt;
			}
			var rotation = subStep.dt * b.m_angularVelocity;
			if(rotation * rotation > box2D.common.B2Settings.b2_maxRotationSquared) {
				if(b.m_angularVelocity < 0.0) b.m_angularVelocity = -box2D.common.B2Settings.b2_maxRotation * subStep.inv_dt; else b.m_angularVelocity = box2D.common.B2Settings.b2_maxRotation * subStep.inv_dt;
			}
			b.m_sweep.c0.setV(b.m_sweep.c);
			b.m_sweep.a0 = b.m_sweep.a;
			b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
			b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
			b.m_sweep.a += subStep.dt * b.m_angularVelocity;
			b.synchronizeTransform();
		}
		var k_toiBaumgarte = 0.75;
		var _g1 = 0, _g = subStep.positionIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var contactsOkay = contactSolver.solvePositionConstraints(k_toiBaumgarte);
			var jointsOkay = true;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				var jointOkay = this.m_joints[j1].solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
				jointsOkay = jointsOkay && jointOkay;
			}
			if(contactsOkay && jointsOkay) break;
		}
		this.report(contactSolver.m_constraints);
	}
	,solve: function(step,gravity,allowSleep) {
		var i;
		var j;
		var b;
		var joint;
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			b = this.m_bodies[i1];
			if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
			b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
			b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
			b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
			b.m_linearVelocity.multiply(box2D.common.math.B2Math.clamp(1.0 - step.dt * b.m_linearDamping,0.0,1.0));
			b.m_angularVelocity *= box2D.common.math.B2Math.clamp(1.0 - step.dt * b.m_angularDamping,0.0,1.0);
		}
		this.m_contactSolver.initialize(step,this.m_contacts,this.m_contactCount,this.m_allocator);
		var contactSolver = this.m_contactSolver;
		contactSolver.initVelocityConstraints(step);
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			joint = this.m_joints[i1];
			joint.initVelocityConstraints(step);
		}
		var _g1 = 0, _g = step.velocityIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				joint = this.m_joints[j1];
				joint.solveVelocityConstraints(step);
			}
			contactSolver.solveVelocityConstraints();
		}
		var _g1 = 0, _g = this.m_jointCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			joint = this.m_joints[i1];
			joint.finalizeVelocityConstraints();
		}
		contactSolver.finalizeVelocityConstraints();
		var _g1 = 0, _g = this.m_bodyCount;
		while(_g1 < _g) {
			var i1 = _g1++;
			b = this.m_bodies[i1];
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
			var translationX = step.dt * b.m_linearVelocity.x;
			var translationY = step.dt * b.m_linearVelocity.y;
			if(translationX * translationX + translationY * translationY > box2D.common.B2Settings.b2_maxTranslationSquared) {
				b.m_linearVelocity.normalize();
				b.m_linearVelocity.x *= box2D.common.B2Settings.b2_maxTranslation * step.inv_dt;
				b.m_linearVelocity.y *= box2D.common.B2Settings.b2_maxTranslation * step.inv_dt;
			}
			var rotation = step.dt * b.m_angularVelocity;
			if(rotation * rotation > box2D.common.B2Settings.b2_maxRotationSquared) {
				if(b.m_angularVelocity < 0.0) b.m_angularVelocity = -box2D.common.B2Settings.b2_maxRotation * step.inv_dt; else b.m_angularVelocity = box2D.common.B2Settings.b2_maxRotation * step.inv_dt;
			}
			b.m_sweep.c0.setV(b.m_sweep.c);
			b.m_sweep.a0 = b.m_sweep.a;
			b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
			b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
			b.m_sweep.a += step.dt * b.m_angularVelocity;
			b.synchronizeTransform();
		}
		var _g1 = 0, _g = step.positionIterations;
		while(_g1 < _g) {
			var i1 = _g1++;
			var contactsOkay = contactSolver.solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
			var jointsOkay = true;
			var _g3 = 0, _g2 = this.m_jointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				joint = this.m_joints[j1];
				var jointOkay = joint.solvePositionConstraints(box2D.common.B2Settings.b2_contactBaumgarte);
				jointsOkay = jointsOkay && jointOkay;
			}
			if(contactsOkay && jointsOkay) break;
		}
		this.report(contactSolver.m_constraints);
		if(allowSleep) {
			var minSleepTime = box2D.common.math.B2Math.get_MAX_VALUE();
			var linTolSqr = box2D.common.B2Settings.b2_linearSleepTolerance * box2D.common.B2Settings.b2_linearSleepTolerance;
			var angTolSqr = box2D.common.B2Settings.b2_angularSleepTolerance * box2D.common.B2Settings.b2_angularSleepTolerance;
			var _g1 = 0, _g = this.m_bodyCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				b = this.m_bodies[i1];
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
				if((b.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == 0) {
					b.m_sleepTime = 0.0;
					minSleepTime = 0.0;
				}
				if((b.m_flags & box2D.dynamics.B2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || box2D.common.math.B2Math.dot(b.m_linearVelocity,b.m_linearVelocity) > linTolSqr) {
					b.m_sleepTime = 0.0;
					minSleepTime = 0.0;
				} else {
					b.m_sleepTime += step.dt;
					minSleepTime = box2D.common.math.B2Math.min(minSleepTime,b.m_sleepTime);
				}
			}
			if(minSleepTime >= box2D.common.B2Settings.b2_timeToSleep) {
				var _g1 = 0, _g = this.m_bodyCount;
				while(_g1 < _g) {
					var i1 = _g1++;
					b = this.m_bodies[i1];
					b.setAwake(false);
				}
			}
		}
	}
	,clear: function() {
		this.m_bodyCount = 0;
		this.m_contactCount = 0;
		this.m_jointCount = 0;
	}
	,initialize: function(bodyCapacity,contactCapacity,jointCapacity,allocator,listener,contactSolver) {
		var i;
		this.m_bodyCapacity = bodyCapacity;
		this.m_contactCapacity = contactCapacity;
		this.m_jointCapacity = jointCapacity;
		this.m_bodyCount = 0;
		this.m_contactCount = 0;
		this.m_jointCount = 0;
		this.m_allocator = allocator;
		this.m_listener = listener;
		this.m_contactSolver = contactSolver;
		var _g = this.m_bodies.length;
		while(_g < bodyCapacity) {
			var i1 = _g++;
			this.m_bodies[i1] = null;
		}
		var _g = this.m_contacts.length;
		while(_g < contactCapacity) {
			var i1 = _g++;
			this.m_contacts[i1] = null;
		}
		var _g = this.m_joints.length;
		while(_g < jointCapacity) {
			var i1 = _g++;
			this.m_joints[i1] = null;
		}
	}
	,__class__: box2D.dynamics.B2Island
}
box2D.dynamics.B2TimeStep = function() {
};
$hxClasses["box2D.dynamics.B2TimeStep"] = box2D.dynamics.B2TimeStep;
box2D.dynamics.B2TimeStep.__name__ = true;
box2D.dynamics.B2TimeStep.prototype = {
	set: function(step) {
		this.dt = step.dt;
		this.inv_dt = step.inv_dt;
		this.positionIterations = step.positionIterations;
		this.velocityIterations = step.velocityIterations;
		this.warmStarting = step.warmStarting;
	}
	,__class__: box2D.dynamics.B2TimeStep
}
box2D.dynamics.B2World = function(gravity,doSleep) {
	this.s_stack = new Array();
	this.m_contactManager = new box2D.dynamics.B2ContactManager();
	this.m_contactSolver = new box2D.dynamics.contacts.B2ContactSolver();
	this.m_island = new box2D.dynamics.B2Island();
	this.m_destructionListener = null;
	this.m_debugDraw = null;
	this.m_bodyList = null;
	this.m_contactList = null;
	this.m_jointList = null;
	this.m_controllerList = null;
	this.m_bodyCount = 0;
	this.m_contactCount = 0;
	this.m_jointCount = 0;
	this.m_controllerCount = 0;
	box2D.dynamics.B2World.m_warmStarting = true;
	box2D.dynamics.B2World.m_continuousPhysics = true;
	this.m_allowSleep = doSleep;
	this.m_gravity = gravity;
	this.m_inv_dt0 = 0.0;
	this.m_contactManager.m_world = this;
	var bd = new box2D.dynamics.B2BodyDef();
	this.m_groundBody = this.createBody(bd);
	this.images = new Array();
};
$hxClasses["box2D.dynamics.B2World"] = box2D.dynamics.B2World;
box2D.dynamics.B2World.__name__ = true;
box2D.dynamics.B2World.prototype = {
	drawShape: function(shape,xf,color) {
		switch( (shape.m_type)[1] ) {
		case 1:
			var circle = js.Boot.__cast(shape , box2D.collision.shapes.B2CircleShape);
			var center = box2D.common.math.B2Math.mulX(xf,circle.m_p);
			var radius = circle.m_radius;
			var axis = xf.R.col1;
			this.m_debugDraw.drawCircle(center,radius,color);
			break;
		case 2:
			var i;
			var poly = js.Boot.__cast(shape , box2D.collision.shapes.B2PolygonShape);
			var vertexCount = poly.getVertexCount();
			var localVertices = poly.getVertices();
			var vertices = new Array();
			var _g = 0;
			while(_g < vertexCount) {
				var i1 = _g++;
				vertices[i1] = box2D.common.math.B2Math.mulX(xf,localVertices[i1]);
			}
			this.m_debugDraw.drawPolygon(vertices,vertexCount,color);
			break;
		case 3:
			var edge = js.Boot.__cast(shape , box2D.collision.shapes.B2EdgeShape);
			this.m_debugDraw.drawSegment(box2D.common.math.B2Math.mulX(xf,edge.getVertex1()),box2D.common.math.B2Math.mulX(xf,edge.getVertex2()),color);
			break;
		default:
		}
	}
	,drawJoint: function(joint) {
		var b1 = joint.getBodyA();
		var b2 = joint.getBodyB();
		var xf1 = b1.m_xf;
		var xf2 = b2.m_xf;
		var x1 = xf1.position;
		var x2 = xf2.position;
		var p1 = joint.getAnchorA();
		var p2 = joint.getAnchorB();
		var color = box2D.dynamics.B2World.s_jointColor;
		switch( (joint.m_type)[1] ) {
		case 3:
			this.m_debugDraw.drawSegment(p1,p2,color);
			break;
		case 4:
			var pulley = js.Boot.__cast(joint , box2D.dynamics.joints.B2PulleyJoint);
			var s1 = pulley.getGroundAnchorA();
			var s2 = pulley.getGroundAnchorB();
			this.m_debugDraw.drawSegment(s1,p1,color);
			this.m_debugDraw.drawSegment(s2,p2,color);
			this.m_debugDraw.drawSegment(s1,s2,color);
			break;
		case 5:
			this.m_debugDraw.drawSegment(p1,p2,color);
			break;
		default:
			if(b1 != this.m_groundBody) this.m_debugDraw.drawSegment(x1,p1,color);
			this.m_debugDraw.drawSegment(p1,p2,color);
			if(b2 != this.m_groundBody) this.m_debugDraw.drawSegment(x2,p2,color);
		}
	}
	,solveTOI: function(step) {
		var b;
		var fA;
		var fB;
		var bA;
		var bB;
		var cEdge;
		var j;
		var island = this.m_island;
		island.initialize(this.m_bodyCount,box2D.common.B2Settings.b2_maxTOIContactsPerIsland,box2D.common.B2Settings.b2_maxTOIJointsPerIsland,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
		var queue = box2D.dynamics.B2World.s_queue;
		b = this.m_bodyList;
		while(b != null) {
			b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			b.m_sweep.t0 = 0.0;
			b = b.m_next;
		}
		var c = this.m_contactList;
		while(c != null) {
			c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
			c = c.m_next;
		}
		j = this.m_jointList;
		while(j != null) {
			j.m_islandFlag = false;
			j = j.m_next;
		}
		while(true) {
			var minContact = null;
			var minTOI = 1.0;
			c = this.m_contactList;
			while(c != null) {
				if(c.isSensor() == true || c.isEnabled() == false || c.isContinuous() == false) {
					c = c.m_next;
					continue;
				}
				var toi = 1.0;
				if((c.m_flags & box2D.dynamics.contacts.B2Contact.e_toiFlag) != 0) toi = c.m_toi; else {
					fA = c.m_fixtureA;
					fB = c.m_fixtureB;
					bA = fA.m_body;
					bB = fB.m_body;
					if((bA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bA.isAwake() == false) && (bB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bB.isAwake() == false)) {
						c = c.m_next;
						continue;
					}
					var t0 = bA.m_sweep.t0;
					if(bA.m_sweep.t0 < bB.m_sweep.t0) {
						t0 = bB.m_sweep.t0;
						bA.m_sweep.advance(t0);
					} else if(bB.m_sweep.t0 < bA.m_sweep.t0) {
						t0 = bA.m_sweep.t0;
						bB.m_sweep.advance(t0);
					}
					toi = c.computeTOI(bA.m_sweep,bB.m_sweep);
					box2D.common.B2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
					if(toi > 0.0 && toi < 1.0) {
						toi = (1.0 - toi) * t0 + toi;
						if(toi > 1) toi = 1;
					}
					c.m_toi = toi;
					c.m_flags |= box2D.dynamics.contacts.B2Contact.e_toiFlag;
				}
				if(box2D.common.math.B2Math.get_MIN_VALUE() < toi && toi < minTOI) {
					minContact = c;
					minTOI = toi;
				}
				c = c.m_next;
			}
			if(minContact == null || 1.0 - 100.0 * box2D.common.math.B2Math.get_MIN_VALUE() < minTOI) break;
			fA = minContact.m_fixtureA;
			fB = minContact.m_fixtureB;
			bA = fA.m_body;
			bB = fB.m_body;
			box2D.dynamics.B2World.s_backupA.set(bA.m_sweep);
			box2D.dynamics.B2World.s_backupB.set(bB.m_sweep);
			bA.advance(minTOI);
			bB.advance(minTOI);
			minContact.update(this.m_contactManager.m_contactListener);
			minContact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
			if(minContact.isSensor() == true || minContact.isEnabled() == false) {
				bA.m_sweep.set(box2D.dynamics.B2World.s_backupA);
				bB.m_sweep.set(box2D.dynamics.B2World.s_backupB);
				bA.synchronizeTransform();
				bB.synchronizeTransform();
				continue;
			}
			if(minContact.isTouching() == false) continue;
			var seed = bA;
			if(seed.getType() != box2D.dynamics.B2Body.b2_dynamicBody) seed = bB;
			island.clear();
			var queueStart = 0;
			var queueSize = 0;
			queue[queueStart + queueSize++] = seed;
			seed.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
			while(queueSize > 0) {
				b = queue[queueStart++];
				--queueSize;
				island.addBody(b);
				if(b.isAwake() == false) b.setAwake(true);
				if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
				cEdge = b.m_contactList;
				var other;
				while(cEdge != null) {
					if(island.m_contactCount == island.m_contactCapacity) {
						cEdge = cEdge.next;
						break;
					}
					if((cEdge.contact.m_flags & box2D.dynamics.contacts.B2Contact.e_islandFlag) != 0) {
						cEdge = cEdge.next;
						continue;
					}
					if(cEdge.contact.isSensor() == true || cEdge.contact.isEnabled() == false || cEdge.contact.isTouching() == false) {
						cEdge = cEdge.next;
						continue;
					}
					island.addContact(cEdge.contact);
					cEdge.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
					other = cEdge.other;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						cEdge = cEdge.next;
						continue;
					}
					if(other.getType() != box2D.dynamics.B2Body.b2_staticBody) {
						other.advance(minTOI);
						other.setAwake(true);
					}
					queue[queueStart + queueSize] = other;
					++queueSize;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					cEdge = cEdge.next;
				}
				var jEdge = b.m_jointList;
				while(jEdge != null) {
					if(island.m_jointCount == island.m_jointCapacity) {
						jEdge = jEdge.next;
						continue;
					}
					if(jEdge.joint.m_islandFlag == true) {
						jEdge = jEdge.next;
						continue;
					}
					other = jEdge.other;
					if(other.isActive() == false) {
						jEdge = jEdge.next;
						continue;
					}
					island.addJoint(jEdge.joint);
					jEdge.joint.m_islandFlag = true;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						jEdge = jEdge.next;
						continue;
					}
					if(other.getType() != box2D.dynamics.B2Body.b2_staticBody) {
						other.advance(minTOI);
						other.setAwake(true);
					}
					queue[queueStart + queueSize] = other;
					++queueSize;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					jEdge = jEdge.next;
				}
			}
			var subStep = box2D.dynamics.B2World.s_timestep;
			subStep.warmStarting = false;
			subStep.dt = (1.0 - minTOI) * step.dt;
			subStep.inv_dt = 1.0 / subStep.dt;
			subStep.dtRatio = 0.0;
			subStep.velocityIterations = step.velocityIterations;
			subStep.positionIterations = step.positionIterations;
			island.solveTOI(subStep);
			var i;
			var _g1 = 0, _g = island.m_bodyCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				b = island.m_bodies[i1];
				b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
				if(b.isAwake() == false) continue;
				if(b.getType() != box2D.dynamics.B2Body.b2_dynamicBody) continue;
				b.synchronizeFixtures();
				cEdge = b.m_contactList;
				while(cEdge != null) {
					cEdge.contact.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_toiFlag;
					cEdge = cEdge.next;
				}
			}
			var _g1 = 0, _g = island.m_contactCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				c = island.m_contacts[i1];
				c.m_flags &= ~(box2D.dynamics.contacts.B2Contact.e_toiFlag | box2D.dynamics.contacts.B2Contact.e_islandFlag);
			}
			var _g1 = 0, _g = island.m_jointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				j = island.m_joints[i1];
				j.m_islandFlag = false;
			}
			this.m_contactManager.findNewContacts();
		}
	}
	,solve: function(step) {
		var b;
		var controller = this.m_controllerList;
		while(controller != null) {
			controller.step(step);
			controller = controller.m_next;
		}
		var island = this.m_island;
		island.initialize(this.m_bodyCount,this.m_contactCount,this.m_jointCount,null,this.m_contactManager.m_contactListener,this.m_contactSolver);
		b = this.m_bodyList;
		while(b != null) {
			b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			b = b.m_next;
		}
		var c = this.m_contactList;
		while(c != null) {
			c.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_islandFlag;
			c = c.m_next;
		}
		var j = this.m_jointList;
		while(j != null) {
			j.m_islandFlag = false;
			j = j.m_next;
		}
		var stackSize = this.m_bodyCount;
		var stack = this.s_stack;
		var seed = this.m_bodyList;
		while(seed != null) {
			if((seed.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
				seed = seed.m_next;
				continue;
			}
			if(seed.isAwake() == false || seed.isActive() == false) {
				seed = seed.m_next;
				continue;
			}
			if(seed.getType() == box2D.dynamics.B2Body.b2_staticBody) {
				seed = seed.m_next;
				continue;
			}
			island.clear();
			var stackCount = 0;
			stack[stackCount++] = seed;
			seed.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
			while(stackCount > 0) {
				b = stack[--stackCount];
				island.addBody(b);
				if(b.isAwake() == false) b.setAwake(true);
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) continue;
				var other;
				var ce = b.m_contactList;
				while(ce != null) {
					if((ce.contact.m_flags & box2D.dynamics.contacts.B2Contact.e_islandFlag) != 0) {
						ce = ce.next;
						continue;
					}
					if(ce.contact.isSensor() == true || ce.contact.isEnabled() == false || ce.contact.isTouching() == false) {
						ce = ce.next;
						continue;
					}
					island.addContact(ce.contact);
					ce.contact.m_flags |= box2D.dynamics.contacts.B2Contact.e_islandFlag;
					other = ce.other;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						ce = ce.next;
						continue;
					}
					stack[stackCount++] = other;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					ce = ce.next;
				}
				var jn = b.m_jointList;
				while(jn != null) {
					if(jn.joint.m_islandFlag == true) {
						jn = jn.next;
						continue;
					}
					other = jn.other;
					if(other.isActive() == false) {
						jn = jn.next;
						continue;
					}
					island.addJoint(jn.joint);
					jn.joint.m_islandFlag = true;
					if((other.m_flags & box2D.dynamics.B2Body.e_islandFlag) != 0) {
						jn = jn.next;
						continue;
					}
					stack[stackCount++] = other;
					other.m_flags |= box2D.dynamics.B2Body.e_islandFlag;
					jn = jn.next;
				}
			}
			island.solve(step,this.m_gravity,this.m_allowSleep);
			var _g1 = 0, _g = island.m_bodyCount;
			while(_g1 < _g) {
				var i = _g1++;
				b = island.m_bodies[i];
				if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) b.m_flags &= ~box2D.dynamics.B2Body.e_islandFlag;
			}
			seed = seed.m_next;
		}
		var _g1 = 0, _g = stack.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(stack[i] == null) break;
			stack[i] = null;
		}
		b = this.m_bodyList;
		while(b != null) {
			if(b.isAwake() == false || b.isActive() == false) {
				b = b.m_next;
				continue;
			}
			if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) {
				b = b.m_next;
				continue;
			}
			b.synchronizeFixtures();
			b = b.m_next;
		}
		this.m_contactManager.findNewContacts();
	}
	,isLocked: function() {
		return (this.m_flags & box2D.dynamics.B2World.e_locked) > 0;
	}
	,drawDebugData: function() {
		if(this.m_debugDraw == null) return;
		var flags = this.m_debugDraw.getFlags();
		var i;
		var b;
		var f;
		var s;
		var j;
		var bp;
		var invQ = new box2D.common.math.B2Vec2();
		var x1 = new box2D.common.math.B2Vec2();
		var x2 = new box2D.common.math.B2Vec2();
		var xf;
		var b1 = new box2D.collision.B2AABB();
		var b2 = new box2D.collision.B2AABB();
		var vs = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
		var color = new box2D.common.B2Color(0,0,0);
		if((flags & box2D.dynamics.B2DebugDraw.e_shapeBit) != 0) {
			b = this.m_bodyList;
			while(b != null) {
				xf = b.m_xf;
				f = b.getFixtureList();
				while(f != null) {
					s = f.getShape();
					if(b.isActive() == false) {
						color.set(0.5,0.5,0.3);
						this.drawShape(s,xf,color);
					} else if(b.getType() == box2D.dynamics.B2Body.b2_staticBody) {
						color.set(0.5,0.9,0.5);
						this.drawShape(s,xf,color);
					} else if(b.getType() == box2D.dynamics.B2Body.b2_kinematicBody) {
						color.set(0.5,0.5,0.9);
						this.drawShape(s,xf,color);
					} else if(b.isAwake() == false) {
						color.set(0.6,0.6,0.6);
						this.drawShape(s,xf,color);
					} else {
						color.set(0.9,0.7,0.7);
						this.drawShape(s,xf,color);
					}
					f = f.m_next;
				}
				b = b.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_jointBit) != 0) {
			j = this.m_jointList;
			while(j != null) {
				this.drawJoint(j);
				j = j.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_controllerBit) != 0) {
			var c = this.m_controllerList;
			while(c != null) {
				c.draw(this.m_debugDraw);
				c = c.m_next;
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_pairBit) != 0) {
			color.set(0.3,0.9,0.9);
			var contact = this.m_contactManager.m_contactList;
			while(contact != null) {
				var fixtureA = contact.getFixtureA();
				var fixtureB = contact.getFixtureB();
				var cA = fixtureA.getAABB().getCenter();
				var cB = fixtureB.getAABB().getCenter();
				this.m_debugDraw.drawSegment(cA,cB,color);
				contact = contact.getNext();
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_aabbBit) != 0) {
			bp = this.m_contactManager.m_broadPhase;
			vs = [new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2(),new box2D.common.math.B2Vec2()];
			b = this.m_bodyList;
			while(b != null) {
				if(b.isActive() == false) {
					b = b.getNext();
					continue;
				}
				f = b.getFixtureList();
				while(f != null) {
					var aabb = bp.getFatAABB(f.m_proxy);
					vs[0].set(aabb.lowerBound.x,aabb.lowerBound.y);
					vs[1].set(aabb.upperBound.x,aabb.lowerBound.y);
					vs[2].set(aabb.upperBound.x,aabb.upperBound.y);
					vs[3].set(aabb.lowerBound.x,aabb.upperBound.y);
					this.m_debugDraw.drawPolygon(vs,4,color);
					f = f.getNext();
				}
				b = b.getNext();
			}
		}
		if((flags & box2D.dynamics.B2DebugDraw.e_centerOfMassBit) != 0) {
			b = this.m_bodyList;
			while(b != null) {
				xf = box2D.dynamics.B2World.s_xf;
				xf.R = b.m_xf.R;
				xf.position = b.getWorldCenter();
				this.m_debugDraw.drawTransform(xf);
				b = b.m_next;
			}
		}
	}
	,clearForces: function() {
		var body = this.m_bodyList;
		while(body != null) {
			body.m_force.setZero();
			body.m_torque = 0.0;
			body = body.m_next;
		}
	}
	,step: function(dt,velocityIterations,positionIterations) {
		if((this.m_flags & box2D.dynamics.B2World.e_newFixture) != 0) {
			this.m_contactManager.findNewContacts();
			this.m_flags &= ~box2D.dynamics.B2World.e_newFixture;
		}
		this.m_flags |= box2D.dynamics.B2World.e_locked;
		var step = box2D.dynamics.B2World.s_timestep2;
		step.dt = dt;
		step.velocityIterations = velocityIterations;
		step.positionIterations = positionIterations;
		if(dt > 0.0) step.inv_dt = 1.0 / dt; else step.inv_dt = 0.0;
		step.dtRatio = this.m_inv_dt0 * dt;
		step.warmStarting = box2D.dynamics.B2World.m_warmStarting;
		this.m_contactManager.collide();
		if(step.dt > 0.0) this.solve(step);
		if(box2D.dynamics.B2World.m_continuousPhysics && step.dt > 0.0) this.solveTOI(step);
		if(step.dt > 0.0) this.m_inv_dt0 = step.inv_dt;
		this.m_flags &= ~box2D.dynamics.B2World.e_locked;
	}
	,destroyJoint: function(j) {
		var collideConnected = j.m_collideConnected;
		if(j.m_prev != null) j.m_prev.m_next = j.m_next;
		if(j.m_next != null) j.m_next.m_prev = j.m_prev;
		if(j == this.m_jointList) this.m_jointList = j.m_next;
		var bodyA = j.m_bodyA;
		var bodyB = j.m_bodyB;
		bodyA.setAwake(true);
		bodyB.setAwake(true);
		if(j.m_edgeA.prev != null) j.m_edgeA.prev.next = j.m_edgeA.next;
		if(j.m_edgeA.next != null) j.m_edgeA.next.prev = j.m_edgeA.prev;
		if(j.m_edgeA == bodyA.m_jointList) bodyA.m_jointList = j.m_edgeA.next;
		j.m_edgeA.prev = null;
		j.m_edgeA.next = null;
		if(j.m_edgeB.prev != null) j.m_edgeB.prev.next = j.m_edgeB.next;
		if(j.m_edgeB.next != null) j.m_edgeB.next.prev = j.m_edgeB.prev;
		if(j.m_edgeB == bodyB.m_jointList) bodyB.m_jointList = j.m_edgeB.next;
		j.m_edgeB.prev = null;
		j.m_edgeB.next = null;
		box2D.dynamics.joints.B2Joint.destroy(j,null);
		--this.m_jointCount;
		if(collideConnected == false) {
			var edge = bodyB.getContactList();
			while(edge != null) {
				if(edge.other == bodyA) edge.contact.flagForFiltering();
				edge = edge.next;
			}
		}
	}
	,destroyBody: function(b) {
		if(this.isLocked() == true) return;
		var jn = b.m_jointList;
		while(jn != null) {
			var jn0 = jn;
			jn = jn.next;
			if(this.m_destructionListener != null) this.m_destructionListener.sayGoodbyeJoint(jn0.joint);
			this.destroyJoint(jn0.joint);
		}
		var coe = b.m_controllerList;
		while(coe != null) {
			var coe0 = coe;
			coe = coe.nextController;
			coe0.controller.removeBody(b);
		}
		var ce = b.m_contactList;
		while(ce != null) {
			var ce0 = ce;
			ce = ce.next;
			this.m_contactManager.destroy(ce0.contact);
		}
		b.m_contactList = null;
		var f = b.m_fixtureList;
		while(f != null) {
			var f0 = f;
			f = f.m_next;
			if(this.m_destructionListener != null) this.m_destructionListener.sayGoodbyeFixture(f0);
			f0.destroyProxy(this.m_contactManager.m_broadPhase);
			f0.destroy();
		}
		b.m_fixtureList = null;
		b.m_fixtureCount = 0;
		if(b.m_prev != null) b.m_prev.m_next = b.m_next;
		if(b.m_next != null) b.m_next.m_prev = b.m_prev;
		if(b == this.m_bodyList) this.m_bodyList = b.m_next;
		--this.m_bodyCount;
	}
	,createBody: function(def) {
		if(this.isLocked() == true) return null;
		var b = new box2D.dynamics.B2Body(def,this);
		b.m_prev = null;
		b.m_next = this.m_bodyList;
		if(this.m_bodyList != null) this.m_bodyList.m_prev = b;
		this.m_bodyList = b;
		++this.m_bodyCount;
		return b;
	}
	,setDebugDraw: function(debugDraw) {
		this.m_debugDraw = debugDraw;
	}
	,setContactListener: function(listener) {
		this.m_contactManager.m_contactListener = listener;
	}
	,__class__: box2D.dynamics.B2World
}
box2D.dynamics.contacts = {}
box2D.dynamics.contacts.B2Contact = function() {
	this.m_nodeA = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_nodeB = new box2D.dynamics.contacts.B2ContactEdge();
	this.m_manifold = new box2D.collision.B2Manifold();
	this.m_oldManifold = new box2D.collision.B2Manifold();
};
$hxClasses["box2D.dynamics.contacts.B2Contact"] = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2Contact.__name__ = true;
box2D.dynamics.contacts.B2Contact.prototype = {
	computeTOI: function(sweepA,sweepB) {
		box2D.dynamics.contacts.B2Contact.s_input.proxyA.set(this.m_fixtureA.getShape());
		box2D.dynamics.contacts.B2Contact.s_input.proxyB.set(this.m_fixtureB.getShape());
		box2D.dynamics.contacts.B2Contact.s_input.sweepA = sweepA;
		box2D.dynamics.contacts.B2Contact.s_input.sweepB = sweepB;
		box2D.dynamics.contacts.B2Contact.s_input.tolerance = box2D.common.B2Settings.b2_linearSlop;
		return box2D.collision.B2TimeOfImpact.timeOfImpact(box2D.dynamics.contacts.B2Contact.s_input);
	}
	,evaluate: function() {
	}
	,update: function(listener) {
		var tManifold = this.m_oldManifold;
		this.m_oldManifold = this.m_manifold;
		this.m_manifold = tManifold;
		this.m_flags |= box2D.dynamics.contacts.B2Contact.e_enabledFlag;
		var touching = false;
		var wasTouching = (this.m_flags & box2D.dynamics.contacts.B2Contact.e_touchingFlag) == box2D.dynamics.contacts.B2Contact.e_touchingFlag;
		var bodyA = this.m_fixtureA.m_body;
		var bodyB = this.m_fixtureB.m_body;
		var aabbOverlap = this.m_fixtureA.m_aabb.testOverlap(this.m_fixtureB.m_aabb);
		if((this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) != 0) {
			if(aabbOverlap) {
				var shapeA = this.m_fixtureA.getShape();
				var shapeB = this.m_fixtureB.getShape();
				var xfA = bodyA.getTransform();
				var xfB = bodyB.getTransform();
				touching = box2D.collision.shapes.B2Shape.testOverlap(shapeA,xfA,shapeB,xfB);
			}
			this.m_manifold.m_pointCount = 0;
		} else {
			if(bodyA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyA.isBullet() || bodyB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyB.isBullet()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_continuousFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_continuousFlag;
			if(aabbOverlap) {
				this.evaluate();
				touching = this.m_manifold.m_pointCount > 0;
				var _g1 = 0, _g = this.m_manifold.m_pointCount;
				while(_g1 < _g) {
					var i = _g1++;
					var mp2 = this.m_manifold.m_points[i];
					mp2.m_normalImpulse = 0.0;
					mp2.m_tangentImpulse = 0.0;
					var id2 = mp2.m_id;
					var _g3 = 0, _g2 = this.m_oldManifold.m_pointCount;
					while(_g3 < _g2) {
						var j = _g3++;
						var mp1 = this.m_oldManifold.m_points[j];
						if(mp1.m_id.get_key() == id2.get_key()) {
							mp2.m_normalImpulse = mp1.m_normalImpulse;
							mp2.m_tangentImpulse = mp1.m_tangentImpulse;
							break;
						}
					}
				}
			} else this.m_manifold.m_pointCount = 0;
			if(touching != wasTouching) {
				bodyA.setAwake(true);
				bodyB.setAwake(true);
			}
		}
		if(touching) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_touchingFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_touchingFlag;
		if(wasTouching == false && touching == true) listener.beginContact(this);
		if(wasTouching == true && touching == false) listener.endContact(this);
		if((this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) == 0) listener.preSolve(this,this.m_oldManifold);
	}
	,reset: function(fixtureA,fixtureB) {
		this.m_flags = box2D.dynamics.contacts.B2Contact.e_enabledFlag;
		if(fixtureA == null || fixtureB == null) {
			this.m_fixtureA = null;
			this.m_fixtureB = null;
			return;
		}
		if(fixtureA.isSensor() || fixtureB.isSensor()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_sensorFlag;
		var bodyA = fixtureA.getBody();
		var bodyB = fixtureB.getBody();
		if(bodyA.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyA.isBullet() || bodyB.getType() != box2D.dynamics.B2Body.b2_dynamicBody || bodyB.isBullet()) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_continuousFlag;
		this.m_fixtureA = fixtureA;
		this.m_fixtureB = fixtureB;
		this.m_manifold.m_pointCount = 0;
		this.m_prev = null;
		this.m_next = null;
		this.m_nodeA.contact = null;
		this.m_nodeA.prev = null;
		this.m_nodeA.next = null;
		this.m_nodeA.other = null;
		this.m_nodeB.contact = null;
		this.m_nodeB.prev = null;
		this.m_nodeB.next = null;
		this.m_nodeB.other = null;
	}
	,flagForFiltering: function() {
		this.m_flags |= box2D.dynamics.contacts.B2Contact.e_filterFlag;
	}
	,getFixtureB: function() {
		return this.m_fixtureB;
	}
	,getFixtureA: function() {
		return this.m_fixtureA;
	}
	,getNext: function() {
		return this.m_next;
	}
	,isEnabled: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_enabledFlag) == box2D.dynamics.contacts.B2Contact.e_enabledFlag;
	}
	,setEnabled: function(flag) {
		if(flag) this.m_flags |= box2D.dynamics.contacts.B2Contact.e_enabledFlag; else this.m_flags &= ~box2D.dynamics.contacts.B2Contact.e_enabledFlag;
	}
	,isSensor: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_sensorFlag) == box2D.dynamics.contacts.B2Contact.e_sensorFlag;
	}
	,isContinuous: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_continuousFlag) == box2D.dynamics.contacts.B2Contact.e_continuousFlag;
	}
	,isTouching: function() {
		return (this.m_flags & box2D.dynamics.contacts.B2Contact.e_touchingFlag) == box2D.dynamics.contacts.B2Contact.e_touchingFlag;
	}
	,getWorldManifold: function(worldManifold) {
		var bodyA = this.m_fixtureA.getBody();
		var bodyB = this.m_fixtureB.getBody();
		var shapeA = this.m_fixtureA.getShape();
		var shapeB = this.m_fixtureB.getShape();
		worldManifold.initialize(this.m_manifold,bodyA.getTransform(),shapeA.m_radius,bodyB.getTransform(),shapeB.m_radius);
	}
	,getManifold: function() {
		return this.m_manifold;
	}
	,__class__: box2D.dynamics.contacts.B2Contact
}
box2D.dynamics.contacts.B2CircleContact = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
$hxClasses["box2D.dynamics.contacts.B2CircleContact"] = box2D.dynamics.contacts.B2CircleContact;
box2D.dynamics.contacts.B2CircleContact.__name__ = true;
box2D.dynamics.contacts.B2CircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2CircleContact();
}
box2D.dynamics.contacts.B2CircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2CircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2CircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		box2D.collision.B2Collision.collideCircles(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2CircleShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2CircleContact
});
box2D.dynamics.contacts.B2ContactConstraint = function() {
	this.localPlaneNormal = new box2D.common.math.B2Vec2();
	this.localPoint = new box2D.common.math.B2Vec2();
	this.normal = new box2D.common.math.B2Vec2();
	this.normalMass = new box2D.common.math.B2Mat22();
	this.K = new box2D.common.math.B2Mat22();
	this.points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.points[i] = new box2D.dynamics.contacts.B2ContactConstraintPoint();
	}
};
$hxClasses["box2D.dynamics.contacts.B2ContactConstraint"] = box2D.dynamics.contacts.B2ContactConstraint;
box2D.dynamics.contacts.B2ContactConstraint.__name__ = true;
box2D.dynamics.contacts.B2ContactConstraint.prototype = {
	__class__: box2D.dynamics.contacts.B2ContactConstraint
}
box2D.dynamics.contacts.B2ContactConstraintPoint = function() {
	this.localPoint = new box2D.common.math.B2Vec2();
	this.rA = new box2D.common.math.B2Vec2();
	this.rB = new box2D.common.math.B2Vec2();
};
$hxClasses["box2D.dynamics.contacts.B2ContactConstraintPoint"] = box2D.dynamics.contacts.B2ContactConstraintPoint;
box2D.dynamics.contacts.B2ContactConstraintPoint.__name__ = true;
box2D.dynamics.contacts.B2ContactConstraintPoint.prototype = {
	__class__: box2D.dynamics.contacts.B2ContactConstraintPoint
}
box2D.dynamics.contacts.B2ContactEdge = function() {
};
$hxClasses["box2D.dynamics.contacts.B2ContactEdge"] = box2D.dynamics.contacts.B2ContactEdge;
box2D.dynamics.contacts.B2ContactEdge.__name__ = true;
box2D.dynamics.contacts.B2ContactEdge.prototype = {
	__class__: box2D.dynamics.contacts.B2ContactEdge
}
box2D.dynamics.contacts.B2ContactFactory = function(allocator) {
	this.m_allocator = allocator;
	this.initializeRegisters();
};
$hxClasses["box2D.dynamics.contacts.B2ContactFactory"] = box2D.dynamics.contacts.B2ContactFactory;
box2D.dynamics.contacts.B2ContactFactory.__name__ = true;
box2D.dynamics.contacts.B2ContactFactory.prototype = {
	destroy: function(contact) {
		if(contact.m_manifold.m_pointCount > 0) {
			contact.m_fixtureA.m_body.setAwake(true);
			contact.m_fixtureB.m_body.setAwake(true);
		}
		var type1 = contact.m_fixtureA.getType();
		var type2 = contact.m_fixtureB.getType();
		var reg = this.m_registers[Type.enumIndex(type1)][Type.enumIndex(type2)];
		if(true) {
			reg.poolCount++;
			contact.m_next = reg.pool;
			reg.pool = contact;
		}
		var destroyFcn = reg.destroyFcn;
		destroyFcn(contact,this.m_allocator);
	}
	,create: function(fixtureA,fixtureB) {
		var type1 = fixtureA.getType();
		var type2 = fixtureB.getType();
		var reg = this.m_registers[Type.enumIndex(type1)][Type.enumIndex(type2)];
		var c;
		if(reg.pool != null) {
			c = reg.pool;
			reg.pool = c.m_next;
			reg.poolCount--;
			c.reset(fixtureA,fixtureB);
			return c;
		}
		var createFcn = reg.createFcn;
		if(createFcn != null) {
			if(reg.primary) {
				c = createFcn(this.m_allocator);
				c.reset(fixtureA,fixtureB);
				return c;
			} else {
				c = createFcn(this.m_allocator);
				c.reset(fixtureB,fixtureA);
				return c;
			}
		} else return null;
	}
	,initializeRegisters: function() {
		this.m_registers = new Array();
		var _g1 = 0, _g = Type.allEnums(box2D.collision.shapes.B2ShapeType).length;
		while(_g1 < _g) {
			var i = _g1++;
			this.m_registers[i] = new Array();
			var _g3 = 0, _g2 = Type.allEnums(box2D.collision.shapes.B2ShapeType).length;
			while(_g3 < _g2) {
				var j = _g3++;
				this.m_registers[i][j] = new box2D.dynamics.contacts.B2ContactRegister();
			}
		}
		this.addType(box2D.dynamics.contacts.B2CircleContact.create,box2D.dynamics.contacts.B2CircleContact.destroy,box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE,box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE);
		this.addType(box2D.dynamics.contacts.B2PolyAndCircleContact.create,box2D.dynamics.contacts.B2PolyAndCircleContact.destroy,box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE,box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE);
		this.addType(box2D.dynamics.contacts.B2PolygonContact.create,box2D.dynamics.contacts.B2PolygonContact.destroy,box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE,box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE);
		this.addType(box2D.dynamics.contacts.B2EdgeAndCircleContact.create,box2D.dynamics.contacts.B2EdgeAndCircleContact.destroy,box2D.collision.shapes.B2ShapeType.EDGE_SHAPE,box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE);
		this.addType(box2D.dynamics.contacts.B2PolyAndEdgeContact.create,box2D.dynamics.contacts.B2PolyAndEdgeContact.destroy,box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE,box2D.collision.shapes.B2ShapeType.EDGE_SHAPE);
	}
	,addType: function(createFcn,destroyFcn,type1,type2) {
		var index1 = Type.enumIndex(type1);
		var index2 = Type.enumIndex(type2);
		this.m_registers[index1][index2].createFcn = createFcn;
		this.m_registers[index1][index2].destroyFcn = destroyFcn;
		this.m_registers[index1][index2].primary = true;
		if(type1 != type2) {
			this.m_registers[index2][index1].createFcn = createFcn;
			this.m_registers[index2][index1].destroyFcn = destroyFcn;
			this.m_registers[index2][index1].primary = false;
		}
	}
	,__class__: box2D.dynamics.contacts.B2ContactFactory
}
box2D.dynamics.contacts.B2ContactRegister = function() {
};
$hxClasses["box2D.dynamics.contacts.B2ContactRegister"] = box2D.dynamics.contacts.B2ContactRegister;
box2D.dynamics.contacts.B2ContactRegister.__name__ = true;
box2D.dynamics.contacts.B2ContactRegister.prototype = {
	__class__: box2D.dynamics.contacts.B2ContactRegister
}
box2D.dynamics.contacts.B2PositionSolverManifold = function() {
	this.m_normal = new box2D.common.math.B2Vec2();
	this.m_separations = new Array();
	this.m_points = new Array();
	var _g1 = 0, _g = box2D.common.B2Settings.b2_maxManifoldPoints;
	while(_g1 < _g) {
		var i = _g1++;
		this.m_points[i] = new box2D.common.math.B2Vec2();
	}
};
$hxClasses["box2D.dynamics.contacts.B2PositionSolverManifold"] = box2D.dynamics.contacts.B2PositionSolverManifold;
box2D.dynamics.contacts.B2PositionSolverManifold.__name__ = true;
box2D.dynamics.contacts.B2PositionSolverManifold.prototype = {
	initialize: function(cc) {
		box2D.common.B2Settings.b2Assert(cc.pointCount > 0);
		var i;
		var clipPointX;
		var clipPointY;
		var tMat;
		var tVec;
		var planePointX;
		var planePointY;
		switch( (cc.type)[1] ) {
		case 0:
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPoint;
			var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.points[0].localPoint;
			var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			var dX = pointBX - pointAX;
			var dY = pointBY - pointAY;
			var d2 = dX * dX + dY * dY;
			if(d2 > box2D.common.math.B2Math.get_MIN_VALUE() * box2D.common.math.B2Math.get_MIN_VALUE()) {
				var d = Math.sqrt(d2);
				this.m_normal.x = dX / d;
				this.m_normal.y = dY / d;
			} else {
				this.m_normal.x = 1.0;
				this.m_normal.y = 0.0;
			}
			this.m_points[0].x = 0.5 * (pointAX + pointBX);
			this.m_points[0].y = 0.5 * (pointAY + pointBY);
			this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
			break;
		case 1:
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPlaneNormal;
			this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = cc.bodyA.m_xf.R;
			tVec = cc.localPoint;
			planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyB.m_xf.R;
			var _g1 = 0, _g = cc.pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tVec = cc.points[i1].localPoint;
				clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				this.m_separations[i1] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
				this.m_points[i1].x = clipPointX;
				this.m_points[i1].y = clipPointY;
			}
			break;
		case 2:
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.localPlaneNormal;
			this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
			this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
			tMat = cc.bodyB.m_xf.R;
			tVec = cc.localPoint;
			planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
			planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
			tMat = cc.bodyA.m_xf.R;
			var _g1 = 0, _g = cc.pointCount;
			while(_g1 < _g) {
				var i1 = _g1++;
				tVec = cc.points[i1].localPoint;
				clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
				clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
				this.m_separations[i1] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
				this.m_points[i1].set(clipPointX,clipPointY);
			}
			this.m_normal.x *= -1;
			this.m_normal.y *= -1;
			break;
		}
	}
	,__class__: box2D.dynamics.contacts.B2PositionSolverManifold
}
box2D.dynamics.contacts.B2ContactSolver = function() {
	this.m_step = new box2D.dynamics.B2TimeStep();
	this.m_constraints = new Array();
};
$hxClasses["box2D.dynamics.contacts.B2ContactSolver"] = box2D.dynamics.contacts.B2ContactSolver;
box2D.dynamics.contacts.B2ContactSolver.__name__ = true;
box2D.dynamics.contacts.B2ContactSolver.prototype = {
	solvePositionConstraints: function(baumgarte) {
		var minSeparation = 0.0;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var invMassA = bodyA.m_mass * bodyA.m_invMass;
			var invIA = bodyA.m_mass * bodyA.m_invI;
			var invMassB = bodyB.m_mass * bodyB.m_invMass;
			var invIB = bodyB.m_mass * bodyB.m_invI;
			box2D.dynamics.contacts.B2ContactSolver.s_psm.initialize(c);
			var normal = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_normal;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				var ccp = c.points[j];
				var point = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_points[j];
				var separation = box2D.dynamics.contacts.B2ContactSolver.s_psm.m_separations[j];
				var rAX = point.x - bodyA.m_sweep.c.x;
				var rAY = point.y - bodyA.m_sweep.c.y;
				var rBX = point.x - bodyB.m_sweep.c.x;
				var rBY = point.y - bodyB.m_sweep.c.y;
				minSeparation = minSeparation < separation?minSeparation:separation;
				var C = box2D.common.math.B2Math.clamp(baumgarte * (separation + box2D.common.B2Settings.b2_linearSlop),-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
				var impulse = -ccp.equalizedMass * C;
				var PX = impulse * normal.x;
				var PY = impulse * normal.y;
				bodyA.m_sweep.c.x -= invMassA * PX;
				bodyA.m_sweep.c.y -= invMassA * PY;
				bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
				bodyA.synchronizeTransform();
				bodyB.m_sweep.c.x += invMassB * PX;
				bodyB.m_sweep.c.y += invMassB * PY;
				bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
				bodyB.synchronizeTransform();
			}
		}
		return minSeparation > -1.5 * box2D.common.B2Settings.b2_linearSlop;
	}
	,finalizeVelocityConstraints: function() {
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var m = c.manifold;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j = _g3++;
				var point1 = m.m_points[j];
				var point2 = c.points[j];
				point1.m_normalImpulse = point2.normalImpulse;
				point1.m_tangentImpulse = point2.tangentImpulse;
			}
		}
	}
	,solveVelocityConstraints: function() {
		var j;
		var ccp;
		var rAX;
		var rAY;
		var rBX;
		var rBY;
		var dvX;
		var dvY;
		var vn;
		var vt;
		var lambda;
		var maxFriction;
		var newImpulse;
		var PX;
		var PY;
		var dX;
		var dY;
		var P1X;
		var P1Y;
		var P2X;
		var P2Y;
		var tMat;
		var tVec;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var wA = bodyA.m_angularVelocity;
			var wB = bodyB.m_angularVelocity;
			var vA = bodyA.m_linearVelocity;
			var vB = bodyB.m_linearVelocity;
			var invMassA = bodyA.m_invMass;
			var invIA = bodyA.m_invI;
			var invMassB = bodyB.m_invMass;
			var invIB = bodyB.m_invI;
			var normalX = c.normal.x;
			var normalY = c.normal.y;
			var tangentX = normalY;
			var tangentY = -normalX;
			var friction = c.friction;
			var tX;
			var _g3 = 0, _g2 = c.pointCount;
			while(_g3 < _g2) {
				var j1 = _g3++;
				ccp = c.points[j1];
				dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
				dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
				vt = dvX * tangentX + dvY * tangentY;
				lambda = ccp.tangentMass * -vt;
				maxFriction = friction * ccp.normalImpulse;
				newImpulse = box2D.common.math.B2Math.clamp(ccp.tangentImpulse + lambda,-maxFriction,maxFriction);
				lambda = newImpulse - ccp.tangentImpulse;
				PX = lambda * tangentX;
				PY = lambda * tangentY;
				vA.x -= invMassA * PX;
				vA.y -= invMassA * PY;
				wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
				vB.x += invMassB * PX;
				vB.y += invMassB * PY;
				wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
				ccp.tangentImpulse = newImpulse;
			}
			var tCount = c.pointCount;
			if(c.pointCount == 1) {
				ccp = c.points[0];
				dvX = vB.x + -wB * ccp.rB.y - vA.x - -wA * ccp.rA.y;
				dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
				vn = dvX * normalX + dvY * normalY;
				lambda = -ccp.normalMass * (vn - ccp.velocityBias);
				newImpulse = ccp.normalImpulse + lambda;
				newImpulse = newImpulse > 0?newImpulse:0.0;
				lambda = newImpulse - ccp.normalImpulse;
				PX = lambda * normalX;
				PY = lambda * normalY;
				vA.x -= invMassA * PX;
				vA.y -= invMassA * PY;
				wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
				vB.x += invMassB * PX;
				vB.y += invMassB * PY;
				wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
				ccp.normalImpulse = newImpulse;
			} else {
				var cp1 = c.points[0];
				var cp2 = c.points[1];
				var aX = cp1.normalImpulse;
				var aY = cp2.normalImpulse;
				var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
				var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
				var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
				var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
				var vn1 = dv1X * normalX + dv1Y * normalY;
				var vn2 = dv2X * normalX + dv2Y * normalY;
				var bX = vn1 - cp1.velocityBias;
				var bY = vn2 - cp2.velocityBias;
				tMat = c.K;
				bX -= tMat.col1.x * aX + tMat.col2.x * aY;
				bY -= tMat.col1.y * aX + tMat.col2.y * aY;
				var k_errorTol = 0.001;
				var _g2 = 0;
				while(_g2 < 1) {
					var i1 = _g2++;
					tMat = c.normalMass;
					var xX = -(tMat.col1.x * bX + tMat.col2.x * bY);
					var xY = -(tMat.col1.y * bX + tMat.col2.y * bY);
					if(xX >= 0.0 && xY >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = -cp1.normalMass * bX;
					xY = 0.0;
					vn1 = 0.0;
					vn2 = c.K.col1.y * xX + bY;
					if(xX >= 0.0 && vn2 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = 0.0;
					xY = -cp2.normalMass * bY;
					vn1 = c.K.col2.x * xY + bX;
					vn2 = 0.0;
					if(xY >= 0.0 && vn1 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					xX = 0.0;
					xY = 0.0;
					vn1 = bX;
					vn2 = bY;
					if(vn1 >= 0.0 && vn2 >= 0.0) {
						dX = xX - aX;
						dY = xY - aY;
						P1X = dX * normalX;
						P1Y = dX * normalY;
						P2X = dY * normalX;
						P2Y = dY * normalY;
						vA.x -= invMassA * (P1X + P2X);
						vA.y -= invMassA * (P1Y + P2Y);
						wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
						vB.x += invMassB * (P1X + P2X);
						vB.y += invMassB * (P1Y + P2Y);
						wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
						cp1.normalImpulse = xX;
						cp2.normalImpulse = xY;
						break;
					}
					break;
				}
			}
			bodyA.m_angularVelocity = wA;
			bodyB.m_angularVelocity = wB;
		}
	}
	,initVelocityConstraints: function(step) {
		var tVec;
		var tVec2;
		var tMat;
		var _g1 = 0, _g = this.m_constraintCount;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.m_constraints[i];
			var bodyA = c.bodyA;
			var bodyB = c.bodyB;
			var invMassA = bodyA.m_invMass;
			var invIA = bodyA.m_invI;
			var invMassB = bodyB.m_invMass;
			var invIB = bodyB.m_invI;
			var normalX = c.normal.x;
			var normalY = c.normal.y;
			var tangentX = normalY;
			var tangentY = -normalX;
			var tX;
			var j;
			var tCount;
			if(step.warmStarting) {
				tCount = c.pointCount;
				var _g2 = 0;
				while(_g2 < tCount) {
					var j1 = _g2++;
					var ccp = c.points[j1];
					ccp.normalImpulse *= step.dtRatio;
					ccp.tangentImpulse *= step.dtRatio;
					var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
					var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
					bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
					bodyA.m_linearVelocity.x -= invMassA * PX;
					bodyA.m_linearVelocity.y -= invMassA * PY;
					bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
					bodyB.m_linearVelocity.x += invMassB * PX;
					bodyB.m_linearVelocity.y += invMassB * PY;
				}
			} else {
				tCount = c.pointCount;
				var _g2 = 0;
				while(_g2 < tCount) {
					var j1 = _g2++;
					var ccp2 = c.points[j1];
					ccp2.normalImpulse = 0.0;
					ccp2.tangentImpulse = 0.0;
				}
			}
		}
	}
	,initialize: function(step,contacts,contactCount,allocator) {
		var contact;
		this.m_step.set(step);
		this.m_allocator = allocator;
		var i;
		var tVec;
		var tMat;
		this.m_constraintCount = contactCount;
		while(this.m_constraints.length < this.m_constraintCount) this.m_constraints[this.m_constraints.length] = new box2D.dynamics.contacts.B2ContactConstraint();
		var _g = 0;
		while(_g < contactCount) {
			var i1 = _g++;
			contact = contacts[i1];
			var fixtureA = contact.m_fixtureA;
			var fixtureB = contact.m_fixtureB;
			var shapeA = fixtureA.m_shape;
			var shapeB = fixtureB.m_shape;
			var radiusA = shapeA.m_radius;
			var radiusB = shapeB.m_radius;
			var bodyA = fixtureA.m_body;
			var bodyB = fixtureB.m_body;
			var manifold = contact.getManifold();
			var friction = box2D.common.B2Settings.b2MixFriction(fixtureA.getFriction(),fixtureB.getFriction());
			var restitution = box2D.common.B2Settings.b2MixRestitution(fixtureA.getRestitution(),fixtureB.getRestitution());
			var vAX = bodyA.m_linearVelocity.x;
			var vAY = bodyA.m_linearVelocity.y;
			var vBX = bodyB.m_linearVelocity.x;
			var vBY = bodyB.m_linearVelocity.y;
			var wA = bodyA.m_angularVelocity;
			var wB = bodyB.m_angularVelocity;
			box2D.common.B2Settings.b2Assert(manifold.m_pointCount > 0);
			box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.initialize(manifold,bodyA.m_xf,radiusA,bodyB.m_xf,radiusB);
			var normalX = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_normal.x;
			var normalY = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_normal.y;
			var cc = this.m_constraints[i1];
			cc.bodyA = bodyA;
			cc.bodyB = bodyB;
			cc.manifold = manifold;
			cc.normal.x = normalX;
			cc.normal.y = normalY;
			cc.pointCount = manifold.m_pointCount;
			cc.friction = friction;
			cc.restitution = restitution;
			cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
			cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
			cc.localPoint.x = manifold.m_localPoint.x;
			cc.localPoint.y = manifold.m_localPoint.y;
			cc.radius = radiusA + radiusB;
			cc.type = manifold.m_type;
			var _g2 = 0, _g1 = cc.pointCount;
			while(_g2 < _g1) {
				var k = _g2++;
				var cp = manifold.m_points[k];
				var ccp = cc.points[k];
				ccp.normalImpulse = cp.m_normalImpulse;
				ccp.tangentImpulse = cp.m_tangentImpulse;
				ccp.localPoint.setV(cp.m_localPoint);
				var rAX = ccp.rA.x = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
				var rAY = ccp.rA.y = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
				var rBX = ccp.rB.x = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
				var rBY = ccp.rB.y = box2D.dynamics.contacts.B2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
				var rnA = rAX * normalY - rAY * normalX;
				var rnB = rBX * normalY - rBY * normalX;
				rnA *= rnA;
				rnB *= rnB;
				var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
				ccp.normalMass = 1.0 / kNormal;
				var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
				kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
				ccp.equalizedMass = 1.0 / kEqualized;
				var tangentX = normalY;
				var tangentY = -normalX;
				var rtA = rAX * tangentY - rAY * tangentX;
				var rtB = rBX * tangentY - rBY * tangentX;
				rtA *= rtA;
				rtB *= rtB;
				var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
				ccp.tangentMass = 1.0 / kTangent;
				ccp.velocityBias = 0.0;
				var tX = vBX + -wB * rBY - vAX - -wA * rAY;
				var tY = vBY + wB * rBX - vAY - wA * rAX;
				var vRel = cc.normal.x * tX + cc.normal.y * tY;
				if(vRel < -box2D.common.B2Settings.b2_velocityThreshold) ccp.velocityBias += -cc.restitution * vRel;
			}
			if(cc.pointCount == 2) {
				var ccp1 = cc.points[0];
				var ccp2 = cc.points[1];
				var invMassA = bodyA.m_invMass;
				var invIA = bodyA.m_invI;
				var invMassB = bodyB.m_invMass;
				var invIB = bodyB.m_invI;
				var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
				var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
				var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
				var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
				var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
				var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
				var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
				var k_maxConditionNumber = 100.0;
				if(k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
					cc.K.col1.set(k11,k12);
					cc.K.col2.set(k12,k22);
					cc.K.getInverse(cc.normalMass);
				} else cc.pointCount = 1;
			}
		}
	}
	,__class__: box2D.dynamics.contacts.B2ContactSolver
}
box2D.dynamics.contacts.B2EdgeAndCircleContact = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
$hxClasses["box2D.dynamics.contacts.B2EdgeAndCircleContact"] = box2D.dynamics.contacts.B2EdgeAndCircleContact;
box2D.dynamics.contacts.B2EdgeAndCircleContact.__name__ = true;
box2D.dynamics.contacts.B2EdgeAndCircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2EdgeAndCircleContact();
}
box2D.dynamics.contacts.B2EdgeAndCircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2EdgeAndCircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2EdgeAndCircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	b2CollideEdgeAndCircle: function(manifold,edge,xf1,circle,xf2) {
	}
	,evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		this.b2CollideEdgeAndCircle(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2EdgeShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2EdgeAndCircleContact
});
box2D.dynamics.contacts.B2PolyAndCircleContact = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
$hxClasses["box2D.dynamics.contacts.B2PolyAndCircleContact"] = box2D.dynamics.contacts.B2PolyAndCircleContact;
box2D.dynamics.contacts.B2PolyAndCircleContact.__name__ = true;
box2D.dynamics.contacts.B2PolyAndCircleContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolyAndCircleContact();
}
box2D.dynamics.contacts.B2PolyAndCircleContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolyAndCircleContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolyAndCircleContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.m_body;
		var bB = this.m_fixtureB.m_body;
		box2D.collision.B2Collision.collidePolygonAndCircle(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2CircleShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
		box2D.common.B2Settings.b2Assert(fixtureA.getType() == box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE);
		box2D.common.B2Settings.b2Assert(fixtureB.getType() == box2D.collision.shapes.B2ShapeType.CIRCLE_SHAPE);
	}
	,__class__: box2D.dynamics.contacts.B2PolyAndCircleContact
});
box2D.dynamics.contacts.B2PolyAndEdgeContact = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
$hxClasses["box2D.dynamics.contacts.B2PolyAndEdgeContact"] = box2D.dynamics.contacts.B2PolyAndEdgeContact;
box2D.dynamics.contacts.B2PolyAndEdgeContact.__name__ = true;
box2D.dynamics.contacts.B2PolyAndEdgeContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolyAndEdgeContact();
}
box2D.dynamics.contacts.B2PolyAndEdgeContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolyAndEdgeContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolyAndEdgeContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	b2CollidePolyAndEdge: function(manifold,polygon,xf1,edge,xf2) {
	}
	,evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		this.b2CollidePolyAndEdge(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2EdgeShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
		box2D.common.B2Settings.b2Assert(fixtureA.getType() == box2D.collision.shapes.B2ShapeType.POLYGON_SHAPE);
		box2D.common.B2Settings.b2Assert(fixtureB.getType() == box2D.collision.shapes.B2ShapeType.EDGE_SHAPE);
	}
	,__class__: box2D.dynamics.contacts.B2PolyAndEdgeContact
});
box2D.dynamics.contacts.B2PolygonContact = function() {
	box2D.dynamics.contacts.B2Contact.call(this);
};
$hxClasses["box2D.dynamics.contacts.B2PolygonContact"] = box2D.dynamics.contacts.B2PolygonContact;
box2D.dynamics.contacts.B2PolygonContact.__name__ = true;
box2D.dynamics.contacts.B2PolygonContact.create = function(allocator) {
	return new box2D.dynamics.contacts.B2PolygonContact();
}
box2D.dynamics.contacts.B2PolygonContact.destroy = function(contact,allocator) {
}
box2D.dynamics.contacts.B2PolygonContact.__super__ = box2D.dynamics.contacts.B2Contact;
box2D.dynamics.contacts.B2PolygonContact.prototype = $extend(box2D.dynamics.contacts.B2Contact.prototype,{
	evaluate: function() {
		var bA = this.m_fixtureA.getBody();
		var bB = this.m_fixtureB.getBody();
		box2D.collision.B2Collision.collidePolygons(this.m_manifold,js.Boot.__cast(this.m_fixtureA.getShape() , box2D.collision.shapes.B2PolygonShape),bA.m_xf,js.Boot.__cast(this.m_fixtureB.getShape() , box2D.collision.shapes.B2PolygonShape),bB.m_xf);
	}
	,reset: function(fixtureA,fixtureB) {
		box2D.dynamics.contacts.B2Contact.prototype.reset.call(this,fixtureA,fixtureB);
	}
	,__class__: box2D.dynamics.contacts.B2PolygonContact
});
box2D.dynamics.controllers = {}
box2D.dynamics.controllers.B2Controller = function() { }
$hxClasses["box2D.dynamics.controllers.B2Controller"] = box2D.dynamics.controllers.B2Controller;
box2D.dynamics.controllers.B2Controller.__name__ = true;
box2D.dynamics.controllers.B2Controller.prototype = {
	removeBody: function(body) {
		var edge = body.m_controllerList;
		while(edge != null && edge.controller != this) edge = edge.nextController;
		if(edge.prevBody != null) edge.prevBody.nextBody = edge.nextBody;
		if(edge.nextBody != null) edge.nextBody.prevBody = edge.prevBody;
		if(edge.nextController != null) edge.nextController.prevController = edge.prevController;
		if(edge.prevController != null) edge.prevController.nextController = edge.nextController;
		if(this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
		if(body.m_controllerList == edge) body.m_controllerList = edge.nextController;
		body.m_controllerCount--;
		this.m_bodyCount--;
	}
	,draw: function(debugDraw) {
	}
	,step: function(step) {
	}
	,__class__: box2D.dynamics.controllers.B2Controller
}
box2D.dynamics.controllers.B2ControllerEdge = function() { }
$hxClasses["box2D.dynamics.controllers.B2ControllerEdge"] = box2D.dynamics.controllers.B2ControllerEdge;
box2D.dynamics.controllers.B2ControllerEdge.__name__ = true;
box2D.dynamics.controllers.B2ControllerEdge.prototype = {
	__class__: box2D.dynamics.controllers.B2ControllerEdge
}
box2D.dynamics.joints = {}
box2D.dynamics.joints.B2Joint = function() { }
$hxClasses["box2D.dynamics.joints.B2Joint"] = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2Joint.__name__ = true;
box2D.dynamics.joints.B2Joint.destroy = function(joint,allocator) {
}
box2D.dynamics.joints.B2Joint.prototype = {
	solvePositionConstraints: function(baumgarte) {
		return false;
	}
	,finalizeVelocityConstraints: function() {
	}
	,solveVelocityConstraints: function(step) {
	}
	,initVelocityConstraints: function(step) {
	}
	,getBodyB: function() {
		return this.m_bodyB;
	}
	,getBodyA: function() {
		return this.m_bodyA;
	}
	,getAnchorB: function() {
		return null;
	}
	,getAnchorA: function() {
		return null;
	}
	,__class__: box2D.dynamics.joints.B2Joint
}
box2D.dynamics.joints.B2JointEdge = function() { }
$hxClasses["box2D.dynamics.joints.B2JointEdge"] = box2D.dynamics.joints.B2JointEdge;
box2D.dynamics.joints.B2JointEdge.__name__ = true;
box2D.dynamics.joints.B2JointEdge.prototype = {
	__class__: box2D.dynamics.joints.B2JointEdge
}
box2D.dynamics.joints.B2JointType = $hxClasses["box2D.dynamics.joints.B2JointType"] = { __ename__ : true, __constructs__ : ["UNKNOWN_JOINT","REVOLUTE_JOINT","PRISMATIC_JOINT","DISTANCE_JOINT","PULLEY_JOINT","MOUSE_JOINT","GEAR_JOINT","LINE_JOINT","WELD_JOINT","FRICTION_JOINT"] }
box2D.dynamics.joints.B2JointType.UNKNOWN_JOINT = ["UNKNOWN_JOINT",0];
box2D.dynamics.joints.B2JointType.UNKNOWN_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.UNKNOWN_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.REVOLUTE_JOINT = ["REVOLUTE_JOINT",1];
box2D.dynamics.joints.B2JointType.REVOLUTE_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.REVOLUTE_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.PRISMATIC_JOINT = ["PRISMATIC_JOINT",2];
box2D.dynamics.joints.B2JointType.PRISMATIC_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.PRISMATIC_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.DISTANCE_JOINT = ["DISTANCE_JOINT",3];
box2D.dynamics.joints.B2JointType.DISTANCE_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.DISTANCE_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.PULLEY_JOINT = ["PULLEY_JOINT",4];
box2D.dynamics.joints.B2JointType.PULLEY_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.PULLEY_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.MOUSE_JOINT = ["MOUSE_JOINT",5];
box2D.dynamics.joints.B2JointType.MOUSE_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.MOUSE_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.GEAR_JOINT = ["GEAR_JOINT",6];
box2D.dynamics.joints.B2JointType.GEAR_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.GEAR_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.LINE_JOINT = ["LINE_JOINT",7];
box2D.dynamics.joints.B2JointType.LINE_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.LINE_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.WELD_JOINT = ["WELD_JOINT",8];
box2D.dynamics.joints.B2JointType.WELD_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.WELD_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2JointType.FRICTION_JOINT = ["FRICTION_JOINT",9];
box2D.dynamics.joints.B2JointType.FRICTION_JOINT.toString = $estr;
box2D.dynamics.joints.B2JointType.FRICTION_JOINT.__enum__ = box2D.dynamics.joints.B2JointType;
box2D.dynamics.joints.B2LimitState = $hxClasses["box2D.dynamics.joints.B2LimitState"] = { __ename__ : true, __constructs__ : ["INACTIVE_LIMIT","AT_LOWER_LIMIT","AT_UPPER_LIMIT","EQUAL_LIMITS"] }
box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT = ["INACTIVE_LIMIT",0];
box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT.toString = $estr;
box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT.__enum__ = box2D.dynamics.joints.B2LimitState;
box2D.dynamics.joints.B2LimitState.AT_LOWER_LIMIT = ["AT_LOWER_LIMIT",1];
box2D.dynamics.joints.B2LimitState.AT_LOWER_LIMIT.toString = $estr;
box2D.dynamics.joints.B2LimitState.AT_LOWER_LIMIT.__enum__ = box2D.dynamics.joints.B2LimitState;
box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT = ["AT_UPPER_LIMIT",2];
box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT.toString = $estr;
box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT.__enum__ = box2D.dynamics.joints.B2LimitState;
box2D.dynamics.joints.B2LimitState.EQUAL_LIMITS = ["EQUAL_LIMITS",3];
box2D.dynamics.joints.B2LimitState.EQUAL_LIMITS.toString = $estr;
box2D.dynamics.joints.B2LimitState.EQUAL_LIMITS.__enum__ = box2D.dynamics.joints.B2LimitState;
box2D.dynamics.joints.B2PulleyJoint = function() { }
$hxClasses["box2D.dynamics.joints.B2PulleyJoint"] = box2D.dynamics.joints.B2PulleyJoint;
box2D.dynamics.joints.B2PulleyJoint.__name__ = true;
box2D.dynamics.joints.B2PulleyJoint.__super__ = box2D.dynamics.joints.B2Joint;
box2D.dynamics.joints.B2PulleyJoint.prototype = $extend(box2D.dynamics.joints.B2Joint.prototype,{
	solvePositionConstraints: function(baumgarte) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
		var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
		var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
		var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		var r1X;
		var r1Y;
		var r2X;
		var r2Y;
		var p1X;
		var p1Y;
		var p2X;
		var p2Y;
		var length1;
		var length2;
		var C;
		var impulse;
		var oldImpulse;
		var oldLimitPositionImpulse;
		var tX;
		var linearError = 0.0;
		if(this.m_state == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			p1X = bA.m_sweep.c.x + r1X;
			p1Y = bA.m_sweep.c.y + r1Y;
			p2X = bB.m_sweep.c.x + r2X;
			p2Y = bB.m_sweep.c.y + r2Y;
			this.m_u1.set(p1X - s1X,p1Y - s1Y);
			this.m_u2.set(p2X - s2X,p2Y - s2Y);
			length1 = this.m_u1.length();
			length2 = this.m_u2.length();
			if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.multiply(1.0 / length1); else this.m_u1.setZero();
			if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.multiply(1.0 / length2); else this.m_u2.setZero();
			C = this.m_constant - length1 - this.m_ratio * length2;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_pulleyMass * C;
			p1X = -impulse * this.m_u1.x;
			p1Y = -impulse * this.m_u1.y;
			p2X = -this.m_ratio * impulse * this.m_u2.x;
			p2Y = -this.m_ratio * impulse * this.m_u2.y;
			bA.m_sweep.c.x += bA.m_invMass * p1X;
			bA.m_sweep.c.y += bA.m_invMass * p1Y;
			bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
			bB.m_sweep.c.x += bB.m_invMass * p2X;
			bB.m_sweep.c.y += bB.m_invMass * p2Y;
			bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
			bA.synchronizeTransform();
			bB.synchronizeTransform();
		}
		if(this.m_limitState1 == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			tMat = bA.m_xf.R;
			r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
			r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
			tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
			r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
			r1X = tX;
			p1X = bA.m_sweep.c.x + r1X;
			p1Y = bA.m_sweep.c.y + r1Y;
			this.m_u1.set(p1X - s1X,p1Y - s1Y);
			length1 = this.m_u1.length();
			if(length1 > box2D.common.B2Settings.b2_linearSlop) {
				this.m_u1.x *= 1.0 / length1;
				this.m_u1.y *= 1.0 / length1;
			} else this.m_u1.setZero();
			C = this.m_maxLength1 - length1;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_limitMass1 * C;
			p1X = -impulse * this.m_u1.x;
			p1Y = -impulse * this.m_u1.y;
			bA.m_sweep.c.x += bA.m_invMass * p1X;
			bA.m_sweep.c.y += bA.m_invMass * p1Y;
			bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
			bA.synchronizeTransform();
		}
		if(this.m_limitState2 == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			tMat = bB.m_xf.R;
			r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
			r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
			tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
			r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
			r2X = tX;
			p2X = bB.m_sweep.c.x + r2X;
			p2Y = bB.m_sweep.c.y + r2Y;
			this.m_u2.set(p2X - s2X,p2Y - s2Y);
			length2 = this.m_u2.length();
			if(length2 > box2D.common.B2Settings.b2_linearSlop) {
				this.m_u2.x *= 1.0 / length2;
				this.m_u2.y *= 1.0 / length2;
			} else this.m_u2.setZero();
			C = this.m_maxLength2 - length2;
			linearError = box2D.common.math.B2Math.max(linearError,-C);
			C = box2D.common.math.B2Math.clamp(C + box2D.common.B2Settings.b2_linearSlop,-box2D.common.B2Settings.b2_maxLinearCorrection,0.0);
			impulse = -this.m_limitMass2 * C;
			p2X = -impulse * this.m_u2.x;
			p2Y = -impulse * this.m_u2.y;
			bB.m_sweep.c.x += bB.m_invMass * p2X;
			bB.m_sweep.c.y += bB.m_invMass * p2Y;
			bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
			bB.synchronizeTransform();
		}
		return linearError < box2D.common.B2Settings.b2_linearSlop;
	}
	,solveVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var v1X;
		var v1Y;
		var v2X;
		var v2Y;
		var P1X;
		var P1Y;
		var P2X;
		var P2Y;
		var Cdot;
		var impulse;
		var oldImpulse;
		if(this.m_state == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
			v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
			v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
			v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
			Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
			impulse = this.m_pulleyMass * -Cdot;
			oldImpulse = this.m_impulse;
			this.m_impulse = box2D.common.math.B2Math.max(0.0,this.m_impulse + impulse);
			impulse = this.m_impulse - oldImpulse;
			P1X = -impulse * this.m_u1.x;
			P1Y = -impulse * this.m_u1.y;
			P2X = -this.m_ratio * impulse * this.m_u2.x;
			P2Y = -this.m_ratio * impulse * this.m_u2.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		}
		if(this.m_limitState1 == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
			v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
			Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
			impulse = -this.m_limitMass1 * Cdot;
			oldImpulse = this.m_limitImpulse1;
			this.m_limitImpulse1 = box2D.common.math.B2Math.max(0.0,this.m_limitImpulse1 + impulse);
			impulse = this.m_limitImpulse1 - oldImpulse;
			P1X = -impulse * this.m_u1.x;
			P1Y = -impulse * this.m_u1.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
		}
		if(this.m_limitState2 == box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT) {
			v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
			v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
			Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
			impulse = -this.m_limitMass2 * Cdot;
			oldImpulse = this.m_limitImpulse2;
			this.m_limitImpulse2 = box2D.common.math.B2Math.max(0.0,this.m_limitImpulse2 + impulse);
			impulse = this.m_limitImpulse2 - oldImpulse;
			P2X = -impulse * this.m_u2.x;
			P2Y = -impulse * this.m_u2.y;
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		}
	}
	,initVelocityConstraints: function(step) {
		var bA = this.m_bodyA;
		var bB = this.m_bodyB;
		var tMat;
		tMat = bA.m_xf.R;
		var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
		var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
		var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
		r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
		r1X = tX;
		tMat = bB.m_xf.R;
		var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
		var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
		tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
		r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
		r2X = tX;
		var p1X = bA.m_sweep.c.x + r1X;
		var p1Y = bA.m_sweep.c.y + r1Y;
		var p2X = bB.m_sweep.c.x + r2X;
		var p2Y = bB.m_sweep.c.y + r2Y;
		var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
		var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
		var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
		var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		this.m_u1.set(p1X - s1X,p1Y - s1Y);
		this.m_u2.set(p2X - s2X,p2Y - s2Y);
		var length1 = this.m_u1.length();
		var length2 = this.m_u2.length();
		if(length1 > box2D.common.B2Settings.b2_linearSlop) this.m_u1.multiply(1.0 / length1); else this.m_u1.setZero();
		if(length2 > box2D.common.B2Settings.b2_linearSlop) this.m_u2.multiply(1.0 / length2); else this.m_u2.setZero();
		var C = this.m_constant - length1 - this.m_ratio * length2;
		if(C > 0.0) {
			this.m_state = box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT;
			this.m_impulse = 0.0;
		} else this.m_state = box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT;
		if(length1 < this.m_maxLength1) {
			this.m_limitState1 = box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT;
			this.m_limitImpulse1 = 0.0;
		} else this.m_limitState1 = box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT;
		if(length2 < this.m_maxLength2) {
			this.m_limitState2 = box2D.dynamics.joints.B2LimitState.INACTIVE_LIMIT;
			this.m_limitImpulse2 = 0.0;
		} else this.m_limitState2 = box2D.dynamics.joints.B2LimitState.AT_UPPER_LIMIT;
		var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
		var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
		this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
		this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
		this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
		this.m_limitMass1 = 1.0 / this.m_limitMass1;
		this.m_limitMass2 = 1.0 / this.m_limitMass2;
		this.m_pulleyMass = 1.0 / this.m_pulleyMass;
		if(step.warmStarting) {
			this.m_impulse *= step.dtRatio;
			this.m_limitImpulse1 *= step.dtRatio;
			this.m_limitImpulse2 *= step.dtRatio;
			var P1X = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
			var P1Y = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
			var P2X = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
			var P2Y = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
			bA.m_linearVelocity.x += bA.m_invMass * P1X;
			bA.m_linearVelocity.y += bA.m_invMass * P1Y;
			bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
			bB.m_linearVelocity.x += bB.m_invMass * P2X;
			bB.m_linearVelocity.y += bB.m_invMass * P2Y;
			bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
		} else {
			this.m_impulse = 0.0;
			this.m_limitImpulse1 = 0.0;
			this.m_limitImpulse2 = 0.0;
		}
	}
	,getGroundAnchorB: function() {
		var a = this.m_ground.m_xf.position.copy();
		a.add(this.m_groundAnchor2);
		return a;
	}
	,getGroundAnchorA: function() {
		var a = this.m_ground.m_xf.position.copy();
		a.add(this.m_groundAnchor1);
		return a;
	}
	,getAnchorB: function() {
		return this.m_bodyB.getWorldPoint(this.m_localAnchor2);
	}
	,getAnchorA: function() {
		return this.m_bodyA.getWorldPoint(this.m_localAnchor1);
	}
	,__class__: box2D.dynamics.joints.B2PulleyJoint
});
var dev = {}
dev.display = {}
dev.display.PlistEntry = function(entry) {
	if(entry == null) return;
	this.name = entry.name;
	this.x = entry.x;
	this.y = entry.y;
	this.width = entry.width;
	this.height = entry.height;
	this.sourceColorX = entry.sourceColorX;
	this.sourceColorY = entry.sourceColorY;
	this.rotated = entry.rotated;
};
$hxClasses["dev.display.PlistEntry"] = dev.display.PlistEntry;
dev.display.PlistEntry.__name__ = true;
dev.display.PlistEntry.prototype = {
	__class__: dev.display.PlistEntry
}
dev.display.PlistParser = function() { }
$hxClasses["dev.display.PlistParser"] = dev.display.PlistParser;
dev.display.PlistParser.__name__ = true;
dev.display.PlistParser.parse = function(xmlDoc) {
	var plist = new Array();
	var frames = null;
	var metadata = null;
	var index = 0;
	var $it0 = xmlDoc.firstElement().firstElement().elements();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x.firstChild().get_nodeValue() == "frames") index = 1; else if(x.get_nodeName() == "dict" && index == 1) frames = x; else if(x.firstChild().get_nodeValue() == "metadata") index = 2; else if(x.get_nodeName() == "dict" && index == 2) metadata = x;
	}
	index = 1;
	var tempEntry = new dev.display.PlistEntry();
	var tempKey = "";
	var $it1 = frames.elements();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		if(x.get_nodeName() == "key" && index == 1) {
			tempEntry.name = x.firstChild().get_nodeValue();
			index = 2;
		} else if(x.get_nodeName() == "dict" && index == 2) {
			index = 1;
			var $it2 = x.elements();
			while( $it2.hasNext() ) {
				var info = $it2.next();
				if(info.get_nodeName() == "key") tempKey = info.firstChild().get_nodeValue(); else switch(tempKey) {
				case "frame":
					var s = dev.display.PlistParser.parseString(info.firstChild().get_nodeValue());
					tempEntry.x = s[0];
					tempEntry.y = s[1];
					tempEntry.width = s[2];
					tempEntry.height = s[3];
					break;
				case "sourceColorRect":
					var s = dev.display.PlistParser.parseString(info.firstChild().get_nodeValue());
					tempEntry.sourceColorX = s[0];
					tempEntry.sourceColorY = s[1];
					break;
				case "rotated":
					if(info.get_nodeName() == "true") tempEntry.rotated = true; else tempEntry.rotated = false;
					break;
				}
			}
			plist.push(new dev.display.PlistEntry(tempEntry));
		}
	}
	return plist;
}
dev.display.PlistParser.parseString = function(str) {
	var ret = new Array();
	var index;
	var temp;
	var buf = new StringBuf();
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(str.charAt(i) != "{" && str.charAt(i) != "}") buf.addSub(str.charAt(i),0);
	}
	var newString = buf.toString();
	var _g = 0, _g1 = newString.split(",");
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		ret.push(Std.parseFloat(i));
	}
	return ret;
}
dev.display.SpriteFrame = function() {
	this._offset = new flambe.math.Point(0,0);
	this._offsetInPixels = new flambe.math.Point(0,0);
	this._originalSize = new dev.math.Size(0,0);
	this._rectInPixels = new flambe.math.Rectangle(0,0,0,0);
	this._rect = new flambe.math.Rectangle(0,0,0,0);
	this._originalSizeInPixels = new dev.math.Size(0,0);
	this._textureFilname = "";
};
$hxClasses["dev.display.SpriteFrame"] = dev.display.SpriteFrame;
dev.display.SpriteFrame.__name__ = true;
dev.display.SpriteFrame.createWithTexture = function(texture,rect,rotated,offset,originalSize) {
	var spriteFrame = new dev.display.SpriteFrame();
	spriteFrame.initWithTexture(texture,rect,rotated,offset,originalSize);
	return spriteFrame;
}
dev.display.SpriteFrame.prototype = {
	initWithTexture: function(texture,rect,rotated,offset,originalSize) {
		this._texture = texture;
		this._rectInPixels = rect;
		this._rect = rect;
		this._offsetInPixels = offset;
		this._offset = offset;
		this._originalSizeInPixels = originalSize;
		this._originalSize = originalSize;
		this._rotated = rotated;
		return true;
	}
	,getOffset: function() {
		return new flambe.math.Point(this._offset.x,this._offset.y);
	}
	,getTexture: function() {
		if(this._texture != null) return this._texture;
		return null;
	}
	,getRect: function() {
		return this._rect;
	}
	,isRotated: function() {
		return this._rotated;
	}
	,__class__: dev.display.SpriteFrame
}
var flambe = {}
flambe.util = {}
flambe.util.Disposable = function() { }
$hxClasses["flambe.util.Disposable"] = flambe.util.Disposable;
flambe.util.Disposable.__name__ = true;
flambe.util.Disposable.prototype = {
	__class__: flambe.util.Disposable
}
flambe.Component = function() { }
$hxClasses["flambe.Component"] = flambe.Component;
flambe.Component.__name__ = true;
flambe.Component.__interfaces__ = [flambe.util.Disposable];
flambe.Component.prototype = {
	setNext: function(next) {
		this.next = next;
	}
	,init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,get_name: function() {
		return null;
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,__class__: flambe.Component
}
flambe.math = {}
flambe.math.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe.math.Point;
flambe.math.Point.__name__ = true;
flambe.math.Point.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe.math.Point
}
flambe.display = {}
flambe.display.Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 1 | 2 | 8 | 128;
	this._localMatrix = new flambe.math.Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe.util.BitSets.add(_g._flags,4 | 8);
	};
	this.x = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe.animation.AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe.display.Sprite;
flambe.display.Sprite.__name__ = true;
flambe.display.Sprite.hitTest = function(entity,x,y) {
	var sprite = entity.getComponent("Sprite_2");
	if(sprite != null) {
		if(!flambe.util.BitSets.containsAll(sprite._flags,1 | 2)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe.display.Sprite._scratchPoint)) {
			x = flambe.display.Sprite._scratchPoint.x;
			y = flambe.display.Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe.display.Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	return sprite != null && sprite.containsLocal(x,y)?sprite:null;
}
flambe.display.Sprite.render = function(entity,g) {
	var sprite = entity.getComponent("Sprite_2");
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if(sprite.get_pixelSnapping()) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity.getComponent("Director_3");
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe.display.Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
}
flambe.display.Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe.display.Sprite.hitTestBackwards(entity.next,x,y);
		return result != null?result:flambe.display.Sprite.hitTest(entity,x,y);
	}
	return null;
}
flambe.display.Sprite.__super__ = flambe.Component;
flambe.display.Sprite.prototype = $extend(flambe.Component.prototype,{
	get_pixelSnapping: function() {
		return flambe.util.BitSets.contains(this._flags,128);
	}
	,get_visible: function() {
		return flambe.util.BitSets.contains(this._flags,1);
	}
	,draw: function(g) {
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,setXY: function(x,y) {
		this.x.set__(x);
		this.y.set__(y);
		return this;
	}
	,centerAnchor: function() {
		this.anchorX.set__(this.getNaturalWidth() / 2);
		this.anchorY.set__(this.getNaturalHeight() / 2);
		return this;
	}
	,setAnchor: function(x,y) {
		this.anchorX.set__(x);
		this.anchorY.set__(y);
		return this;
	}
	,getLocalMatrix: function() {
		if(flambe.util.BitSets.contains(this._flags,4)) {
			this._flags = flambe.util.BitSets.remove(this._flags,4);
			this._localMatrix.compose(this.x.get__(),this.y.get__(),this.scaleX.get__(),this.scaleY.get__(),flambe.math.FMath.toRadians(this.rotation.get__()));
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,get_name: function() {
		return "Sprite_2";
	}
	,__class__: flambe.display.Sprite
});
dev.display.SpriteSheet = function(frame) {
	flambe.display.Sprite.call(this);
	this.frame = frame;
};
$hxClasses["dev.display.SpriteSheet"] = dev.display.SpriteSheet;
dev.display.SpriteSheet.__name__ = true;
dev.display.SpriteSheet.__super__ = flambe.display.Sprite;
dev.display.SpriteSheet.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalWidth: function() {
		if(this.frame == null) return 0;
		return this.frame.getRect().width;
	}
	,getNaturalHeight: function() {
		if(this.frame == null) return 0;
		return this.frame.getRect().height;
	}
	,draw: function(g) {
		this.g = g;
		if(this.frame.isRotated()) {
			g.translate(this.frame.getOffset().x,this.frame.getOffset().y + this.frame.getRect().height);
			g.rotate(-90);
			g.drawSubImage(this.frame.getTexture(),0,0,this.frame.getRect().x,this.frame.getRect().y,this.frame.getRect().height,this.frame.getRect().width);
		} else {
			g.translate(this.frame.getOffset().x,this.frame.getOffset().y);
			g.drawSubImage(this.frame.getTexture(),0,0,this.frame.getRect().x,this.frame.getRect().y,this.frame.getRect().width,this.frame.getRect().height);
		}
	}
	,__class__: dev.display.SpriteSheet
});
dev.display.SpriteSheetPlayer = function(pack,plistName) {
	this.isLooping = false;
	this.paused = false;
	this.currentIndex = 0;
	var xmlDoc = Xml.parse(pack.getFile(plistName).toString());
	this.plist = dev.display.PlistParser.parse(xmlDoc);
	this._spriteFramesInfo = new Array();
	this.sprites = new Array();
	if(this.texture == null) {
		var name = plistName.split(".pli")[0];
		this.texture = pack.getTexture(name);
	}
	this._addSpriteFramesWithDictionary();
	this._initSprites();
	this._root = new flambe.Entity();
	this.speed = -1;
};
$hxClasses["dev.display.SpriteSheetPlayer"] = dev.display.SpriteSheetPlayer;
dev.display.SpriteSheetPlayer.__name__ = true;
dev.display.SpriteSheetPlayer.__super__ = flambe.Component;
dev.display.SpriteSheetPlayer.prototype = $extend(flambe.Component.prototype,{
	setSpeed: function(s) {
		this.speed = s;
	}
	,onUpdate: function(dt) {
		if(this.speed != -1) {
			this.curTime = new Date().getTime();
			if(this.curTime - this.oldTime < this.speed) return; else this.oldTime = this.curTime;
		}
		if(!this.paused && this.currentFrame != null) {
			if(this.currentIndex == this._spriteFramesInfo.length) {
				if(this.isLooping) this.currentIndex = 0; else this.paused = true;
			}
			if(!this.paused) this.currentFrame.frame = this._spriteFramesInfo[this.currentIndex++];
		}
	}
	,onRemoved: function() {
		this._root.parent.removeChild(this._root);
		this.currentFrame.frame = this._spriteFramesInfo[0];
		this.currentIndex = 0;
		this.paused = false;
		this.isLooping = false;
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
		this.oldTime = new Date().getTime();
		this.curTime = new Date().getTime();
	}
	,loop: function() {
		this.play();
		this.isLooping = true;
	}
	,play: function() {
		if(this._root.getComponent("Sprite_2") == null) this._root.add(this.currentFrame);
		this.currentIndex = 0;
		this.paused = false;
	}
	,_initSprites: function() {
		this.currentFrame = new dev.display.SpriteSheet(this._spriteFramesInfo[0]);
		this.currentIndex++;
	}
	,_addSpriteFramesWithDictionary: function() {
		var _g = 0, _g1 = this.plist;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var rect = new flambe.math.Rectangle(p.x,p.y,p.width,p.height);
			var rotated = p.rotated;
			var offset = new flambe.math.Point(p.sourceColorX,p.sourceColorY);
			var size = new dev.math.Size(0,0);
			var frame = dev.display.SpriteFrame.createWithTexture(this.texture,rect,rotated,offset,size);
			this._spriteFramesInfo.push(frame);
		}
	}
	,get_name: function() {
		return "SpriteSheetPlayer_0";
	}
	,__class__: dev.display.SpriteSheetPlayer
});
dev.math = {}
dev.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["dev.math.Rectangle"] = dev.math.Rectangle;
dev.math.Rectangle.__name__ = true;
dev.math.Rectangle.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,rectGetMinY: function() {
		return this.y;
	}
	,rectGetMaxY: function() {
		return this.y + this.height;
	}
	,rectGetMinX: function() {
		return this.x;
	}
	,rectGetMaxX: function() {
		return this.x + this.width;
	}
	,intersect: function(rect) {
		return !(this.rectGetMaxX() < rect.rectGetMinX() || rect.rectGetMaxX() < this.rectGetMinX() || this.rectGetMaxY() < rect.rectGetMinY() || rect.rectGetMaxY() < this.rectGetMinY());
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: dev.math.Rectangle
}
dev.math.Size = function(width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.width = width;
	this.height = height;
};
$hxClasses["dev.math.Size"] = dev.math.Size;
dev.math.Size.__name__ = true;
dev.math.Size.prototype = {
	__class__: dev.math.Size
}
dev.tilemap = {}
dev.tilemap.TMXBase64 = function() { }
$hxClasses["dev.tilemap.TMXBase64"] = dev.tilemap.TMXBase64;
dev.tilemap.TMXBase64.__name__ = true;
dev.tilemap.TMXBase64.decode = function(input) {
	input = StringTools.ltrim(input);
	input = StringTools.rtrim(input);
	var output = [];
	var enc1;
	var enc2;
	var enc3;
	var enc4;
	var i = 0;
	var chr1;
	var chr2;
	var chr3;
	while(i < input.length) {
		enc1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(input.charAt(i++));
		enc2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(input.charAt(i++));
		enc3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(input.charAt(i++));
		enc4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(input.charAt(i++));
		chr1 = enc1 << 2 | enc2 >> 4;
		chr2 = (enc2 & 15) << 4 | enc3 >> 2;
		chr3 = (enc3 & 3) << 6 | enc4;
		output.push(String.fromCharCode(chr1));
		if(enc3 != 64) output.push(String.fromCharCode(chr2));
		if(enc4 != 64) output.push(String.fromCharCode(chr3));
	}
	var o = output.join("");
	var count = 0;
	var _g = 0;
	while(_g < output.length) {
		var i1 = output[_g];
		++_g;
		var x = HxOverrides.cca(i1,0);
		count++;
	}
	return o;
}
dev.tilemap.TMXBase64.decodeAsArray = function(input,lineWidth,bytes) {
	if(bytes == null) bytes = 4;
	var dec = dev.tilemap.TMXBase64.decode(input);
	var ar = [];
	var len = Std["int"](dec.length / bytes);
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ar[i] = 0;
		var j = bytes - 1;
		while(j >= 0) {
			var t = HxOverrides.cca(dec,i * bytes + j) << j * 8;
			ar[i] += t;
			j--;
		}
	}
	return ar;
}
dev.tilemap.TMXBase64.decodeAsOneArray = function(input,lineWidth,bytes) {
	if(bytes == null) bytes = 4;
	var dec = dev.tilemap.TMXBase64.decode(input);
	var ar = [];
	var len = Std["int"](dec.length / bytes);
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ar[i] = 0;
		var j = bytes - 1;
		while(j >= 0) {
			var t = HxOverrides.cca(dec,i * bytes + j) << j * 8;
			ar[i] += t;
			j--;
		}
	}
	return ar;
}
dev.tilemap.TMXBase64.decodeAsArrayBytes = function($byte,lineWidth,bytes) {
	if(bytes == null) bytes = 4;
	var ar = [];
	var len = Std["int"]($byte.length / bytes);
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ar[i] = 0;
		var j = bytes - 1;
		while(j >= 0) {
			var t = $byte.get(i * bytes + j) << j * 8;
			ar[i] += t;
			j--;
		}
	}
	return ar;
}
dev.tilemap.TMXBase64.unzip = function(input,lineWidth) {
	var tempString1 = dev.tilemap.TMXBase64.decode(input);
	var arr = dev.tilemap.TMXBase64.decodeAsOneArray(input,0,1);
	var b = haxe.io.Bytes.ofData(arr);
	var bytes = haxe.zip.InflateImpl.run(new haxe.io.BytesInput(b));
	var ret = dev.tilemap.TMXBase64.decodeAsArrayBytes(bytes,lineWidth);
	return ret;
}
dev.tilemap.TMXGZip = function(data) {
	this.len = 0;
	this.treepos = 0;
	this.data = data;
	this.debug = false;
	this.gpflags = 0;
	this.files = 0;
	this.unzipped = [];
	this.buf32k = new Array();
	this.bIdx = 0;
	this.modeZIP = false;
	this.bytepos = 0;
	this.bb = 1;
	this.bits = 0;
	this.nameBuf = [];
	this.fileout = new Array();
	this.literalTree = new Array();
	this.literalTree[dev.tilemap.TMXGZip.LITERALS - 1] = new dev.tilemap.HufNode();
	this.distanceTree = new Array();
	this.distanceTree[31] = new dev.tilemap.HufNode();
	this.treepos = 0;
	this.Places = null;
	this.len = 0;
	this.fpos = new Array();
	this.fpos[16] = 0;
	this.fpos[0] = 0;
	this.flens = new Array();
	this.fmax = 0;
};
$hxClasses["dev.tilemap.TMXGZip"] = dev.tilemap.TMXGZip;
dev.tilemap.TMXGZip.__name__ = true;
dev.tilemap.TMXGZip.gunzip = function(data) {
	var gzip = new dev.tilemap.TMXGZip(data);
	return gzip.gunzipLocal();
}
dev.tilemap.TMXGZip.prototype = {
	skipdir: function() {
		var tmp = [];
		var compSize, size, os, i, c;
		if((this.gpflags & 8) != 0) {
			tmp[0] = this.readByte();
			tmp[1] = this.readByte();
			tmp[2] = this.readByte();
			tmp[3] = this.readByte();
			compSize = this.readByte();
			compSize |= this.readByte() << 8;
			compSize |= this.readByte() << 16;
			compSize |= this.readByte() << 24;
			size = this.readByte();
			size |= this.readByte() << 8;
			size |= this.readByte() << 16;
			size |= this.readByte() << 24;
		}
		if(this.modeZIP) this.nextFile();
		tmp[0] = this.readByte();
		if(tmp[0] != 8) return 0;
		this.gpflags = this.readByte();
		this.readByte();
		this.readByte();
		this.readByte();
		this.readByte();
		this.readByte();
		os = this.readByte();
		if((this.gpflags & 4) != 0) {
			tmp[0] = this.readByte();
			tmp[2] = this.readByte();
			this.len = tmp[0] + 256 * tmp[1];
			var _g1 = 0, _g = this.len;
			while(_g1 < _g) {
				var i1 = _g1++;
				this.readByte();
			}
		}
		if((this.gpflags & 8) != 0) {
			i = 0;
			this.nameBuf = [];
			while((c = this.readByte()) != 0) {
				if(String.fromCharCode(c) == "7" || String.fromCharCode(c) == ":") i = 0;
				if(i < dev.tilemap.TMXGZip.NAMEMAX - 1) this.nameBuf[i++] = String.fromCharCode(c);
			}
		}
		if((this.gpflags & 2) != 0) {
			this.readByte();
			this.readByte();
		}
		this.deflateLoop();
		size = this.readByte();
		size |= this.readByte() << 8;
		size |= this.readByte() << 16;
		size |= this.readByte() << 24;
		if(this.modeZIP) this.nextFile();
		return 0;
	}
	,nextFile: function() {
		this.outputArr = [];
		this.modeZIP = false;
		var tmp = [];
		tmp[0] = this.readByte();
		tmp[1] = this.readByte();
		if(tmp[0] == 120 && tmp[1] == 218) {
			this.deflateLoop();
			this.unzipped[this.files] = [this.outputArr.join(""),"geonext.gxt"];
			this.files++;
		}
		if(tmp[0] == 31 && tmp[1] == 139) {
			this.skipdir();
			this.unzipped[this.files] = [this.outputArr.join(""),"file"];
			this.files++;
		}
		if(tmp[0] == 80 && tmp[1] == 75) {
			this.modeZIP = true;
			tmp[2] = this.readByte();
			tmp[3] = this.readByte();
			if(tmp[2] == 3 && tmp[3] == 4) {
				tmp[0] = this.readByte();
				tmp[1] = this.readByte();
				this.gpflags = this.readByte();
				this.gpflags |= this.readByte() << 8;
				var method = this.readByte();
				method |= this.readByte() << 8;
				this.readByte();
				this.readByte();
				this.readByte();
				this.readByte();
				var compSize = this.readByte();
				compSize |= this.readByte() << 8;
				compSize |= this.readByte() << 16;
				compSize |= this.readByte() << 24;
				var size = this.readByte();
				size |= this.readByte() << 8;
				size |= this.readByte() << 16;
				size |= this.readByte() << 24;
				var filelen = this.readByte();
				filelen |= this.readByte() << 8;
				var extralen = this.readByte();
				extralen |= this.readByte() << 8;
				var i = 0;
				this.nameBuf = [];
				var c;
				while(filelen-- != 0) {
					c = this.readByte();
					if(String.fromCharCode(c) == "/" || String.fromCharCode(c) == ":") i = 0; else if(i < dev.tilemap.TMXGZip.NAMEMAX - 1) this.nameBuf[i++] = String.fromCharCode(c);
				}
				if(this.fileout == null) this.fileout = this.nameBuf;
				i = 0;
				while(i < extralen) {
					c = this.readByte();
					i++;
				}
				if(method == 8) {
					this.deflateLoop();
					this.unzipped[this.files] = [this.outputArr.join(""),this.nameBuf.join("")];
					this.files++;
				}
				this.skipdir();
			}
		}
	}
	,deflateLoop: function() {
		var last, c, type, len = 0, i;
		do {
			last = this.readBit();
			type = this.readBits(2);
			if(type == 0) {
				var blockLen, cSum = 0;
				this.byteAlign();
				blockLen = this.readByte();
				blockLen |= this.readByte() << 8;
				cSum = this.readByte();
				cSum |= this.readByte() << 8;
				if(((blockLen ^ ~cSum) & 65535) != 0) throw "BlockLen checksum mismatch\n";
				while(blockLen-- != 0) {
					c = this.readByte();
					this.addBuffer(c);
				}
			} else if(type == 1) {
				var j;
				while(true) {
					j = dev.tilemap.TMXGZip.bitReverse[this.readBits(7)] >> 1;
					if(j > 23) {
						j = j << 1 | this.readBit();
						if(j > 199) {
							j -= 128;
							j = j << 1 | this.readBit();
						} else {
							j -= 48;
							if(j > 143) j = j + 136;
						}
					} else j += 256;
					if(j < 256) this.addBuffer(j); else if(j == 256) break; else {
						var len1, dist;
						j -= 256 + 1;
						len1 = this.readBits(dev.tilemap.TMXGZip.cplext[j]) + dev.tilemap.TMXGZip.cplens[j];
						j = dev.tilemap.TMXGZip.bitReverse[this.readBits(5)] >> 3;
						if(dev.tilemap.TMXGZip.cpdext[j] > 8) {
							dist = this.readBits(8);
							dist |= this.readBits(dev.tilemap.TMXGZip.cpdext[j] - 8) << 8;
						} else dist = this.readBits(dev.tilemap.TMXGZip.cpdext[j]);
						dist += dev.tilemap.TMXGZip.cpdist[j];
						var _g = 0;
						while(_g < len1) {
							var j1 = _g++;
							var c1 = this.buf32k[this.bIdx - dist & 32767];
							this.addBuffer(c1);
						}
					}
				}
			} else if(type == 2) {
				var j, n, literalCodes, distCodes, lenCodes;
				var ll = new Array();
				literalCodes = 257 + this.readBits(5);
				distCodes = 1 + this.readBits(5);
				lenCodes = 4 + this.readBits(4);
				var _g = 0;
				while(_g < 19) {
					var j1 = _g++;
					ll[j1] = 0;
				}
				var _g = 0;
				while(_g < lenCodes) {
					var j1 = _g++;
					ll[dev.tilemap.TMXGZip.border[j1]] = this.readBits(3);
				}
				len = this.distanceTree.length;
				var _g = 0;
				while(_g < len) {
					var i1 = _g++;
					this.distanceTree[i1] = new dev.tilemap.HufNode();
				}
				if(this.createTree(this.distanceTree,19,ll,0) != 0) {
					this.flushBuffer();
					return 1;
				}
				n = literalCodes + distCodes;
				i = 0;
				var z = -1;
				while(i < n) {
					z++;
					j = this.decodeValue(this.distanceTree);
					if(j < 16) ll[i++] = j; else if(j == 16) {
						var l;
						j = 3 + this.readBits(2);
						if(i + j > n) {
							this.flushBuffer();
							return 1;
						}
						l = i != 0?ll[i - 1]:0;
						while(j-- != 0) ll[i++] = l;
					} else {
						if(j == 17) j = 3 + this.readBits(3); else j = 11 + this.readBits(7);
						if(i + j > n) {
							this.flushBuffer();
							return 1;
						}
						while(j-- != 0) ll[i++] = 0;
					}
				}
				len = this.literalTree.length;
				var _g = 0;
				while(_g < len) {
					var i1 = _g++;
					this.literalTree[i1] = new dev.tilemap.HufNode();
				}
				if(this.createTree(this.literalTree,literalCodes,ll,0) != 0) {
					this.flushBuffer();
					return 1;
				}
				len = this.literalTree.length;
				var _g = 0;
				while(_g < len) {
					var i1 = _g++;
					this.distanceTree[i1] = new dev.tilemap.HufNode();
				}
				var ll2 = new Array();
				var _g1 = literalCodes, _g = ll.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					ll2[i1 - literalCodes] = ll[i1];
				}
				if(this.createTree(this.distanceTree,distCodes,ll2,0) != 0) {
					this.flushBuffer();
					return 1;
				}
				while(true) {
					j = this.decodeValue(this.literalTree);
					if(j >= 256) {
						var len1, dist;
						j -= 256;
						if(j == 0) break;
						j--;
						len1 = this.readBits(dev.tilemap.TMXGZip.cplext[j]) + dev.tilemap.TMXGZip.cplens[j];
						j = this.decodeValue(this.distanceTree);
						if(dev.tilemap.TMXGZip.cpdext[j] > 8) {
							dist = this.readBits(8);
							dist |= this.readBits(dev.tilemap.TMXGZip.cpdext[j] - 8) << 8;
						} else dist = this.readBits(dev.tilemap.TMXGZip.cpdext[j]);
						dist += dev.tilemap.TMXGZip.cpdist[j];
						while(len1-- != 0) {
							var c1 = this.buf32k[this.bIdx - dist & 32767];
							this.addBuffer(c1);
						}
					} else this.addBuffer(j);
				}
			}
		} while(last == 0);
		this.flushBuffer();
		this.byteAlign();
		return 0;
	}
	,decodeValue: function(currentTree) {
		var len = 0;
		var xtreepos = 0;
		var X = currentTree[xtreepos];
		var b = 0;
		while(true) {
			b = this.readBit();
			if(b != 0) {
				if((X.b1 & 32768) == 0) return X.b1;
				X = X.jump;
				len = currentTree.length;
				var _g = 0;
				while(_g < len) {
					var i = _g++;
					if(currentTree[i] == X) {
						xtreepos = i;
						break;
					}
				}
			} else {
				if((X.b0 & 32768) == 0) return X.b0;
				xtreepos++;
				X = currentTree[xtreepos];
			}
		}
		return -1;
	}
	,createTree: function(currentTree,numval,lengths,show) {
		this.Places = currentTree;
		this.treepos = 0;
		this.flens = lengths;
		this.fmax = numval;
		var _g = 0;
		while(_g < 17) {
			var i = _g++;
			this.fpos[i] = 0;
		}
		this.len = 0;
		if(this.rec() != 0) return -1;
		return 0;
	}
	,rec: function() {
		var curplace = this.Places[this.treepos];
		var tmp;
		if(this.len == 17) return -1;
		this.treepos++;
		this.len++;
		tmp = this.isPat();
		if(tmp >= 0) curplace.b0 = tmp; else {
			curplace.b0 = 32768;
			if(this.rec() != 0) return -1;
		}
		tmp = this.isPat();
		if(tmp >= 0) {
			curplace.b1 = tmp;
			curplace.jump = null;
		} else {
			curplace.b1 = 32768;
			curplace.jump = this.Places[this.treepos];
			curplace.jumppos = this.treepos;
			if(this.rec() != 0) return -1;
		}
		this.len--;
		return 0;
	}
	,isPat: function() {
		while(true) {
			if(this.fpos[this.len] >= this.fmax) return -1;
			if(this.flens[this.fpos[this.len]] == this.len) return this.fpos[this.len]++;
			this.fpos[this.len]++;
		}
	}
	,addBuffer: function(a) {
		this.buf32k[this.bIdx++] = a;
		this.outputArr.push(String.fromCharCode(a));
		if(this.bIdx == 32768) this.bIdx = 0;
	}
	,flushBuffer: function() {
		this.bIdx = 0;
	}
	,readBits: function(a) {
		var res = 0;
		var i = a;
		while(i != 0) {
			res = res << 1 | this.readBit();
			i--;
		}
		if(a != 0) res = dev.tilemap.TMXGZip.bitReverse[res] >> 8 - a;
		return res;
	}
	,readBit: function() {
		this.bits++;
		var carry = this.bb & 1;
		this.bb >>= 1;
		if(this.bb == 0) {
			this.bb = this.readByte();
			carry = this.bb & 1;
			this.bb = this.bb >> 1 | 128;
		}
		return carry;
	}
	,byteAlign: function() {
		this.bb = 1;
	}
	,readByte: function() {
		this.bits += 8;
		if(this.bytepos < this.data.length) return HxOverrides.cca(this.data,this.bytepos++); else return -1;
	}
	,gunzipLocal: function() {
		this.outputArr = new Array();
		this.nextFile();
		return this.unzipped[0][0];
	}
	,__class__: dev.tilemap.TMXGZip
}
dev.tilemap.HufNode = function() {
	this.jumppos = -1;
	this.b1 = 0;
	this.b0 = 0;
};
$hxClasses["dev.tilemap.HufNode"] = dev.tilemap.HufNode;
dev.tilemap.HufNode.__name__ = true;
dev.tilemap.HufNode.prototype = {
	__class__: dev.tilemap.HufNode
}
dev.tilemap.TMXLayer = function() {
	this._layerInfo = null;
	this._mapInfo = null;
	this._layerSize = new dev.math.Size();
	this._mapTileSize = new dev.math.Size();
	this._opacity = 255;
	this._layerName = "";
	this._tiles = new Array();
	this._properties = new haxe.ds.StringMap();
	this._useAutomaticVertexZ = false;
	this._root = new flambe.Entity();
	this._sprites = new Array();
};
$hxClasses["dev.tilemap.TMXLayer"] = dev.tilemap.TMXLayer;
dev.tilemap.TMXLayer.__name__ = true;
dev.tilemap.TMXLayer.create = function(layerInfo,mapInfo) {
	var ret = new dev.tilemap.TMXLayer();
	if(ret.initWithTilesetInfo(layerInfo,mapInfo)) return ret;
	return null;
}
dev.tilemap.TMXLayer.prototype = {
	getRoot: function() {
		return this._root;
	}
	,_parseInternalProperties: function() {
		var vertexz = this.getProperty("vertexz");
		if(vertexz != null) {
			if(vertexz == "automatic") this._useAutomaticVertexZ = true; else this._vertexZvalue = Std.parseInt(vertexz);
		}
	}
	,getProperty: function(propertyName) {
		return this._properties.get(propertyName);
	}
	,_vertexZForPos: function(row,col) {
		var ret = 0;
		var maxVal = 0;
		if(this._useAutomaticVertexZ) {
			var _g = this;
			switch(_g._layerOrientation) {
			case dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ISO:
				ret = row + col;
				break;
			case dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ORTHO:
				ret = row;
				break;
			default:
				null;
			}
		} else ret = this._vertexZvalue;
		return ret;
	}
	,getTilesetInfo: function(gid) {
		var a = this._mapInfo.getTilesets();
		var _g1 = 0, _g = this._mapInfo.getTilesets().length;
		while(_g1 < _g) {
			var i = _g1++;
			if(a[i + 1] != null) {
				if(gid >= a[i].firstGid && gid < a[i + 1].firstGid) return a[i];
			} else return a[i];
		}
		return null;
	}
	,setupTiles: function() {
		var count = 0;
		var _g1 = 0, _g = Std["int"](this._layerInfo._layerSize.height);
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = 0, _g2 = Std["int"](this._layerInfo._layerSize.width);
			while(_g3 < _g2) {
				var col = _g3++;
				var gid = this._layerInfo._tiles[Std["int"](col + row * this._layerInfo._layerSize.width)];
				if(gid == 0) continue; else {
					var tilesetInfo = this.getTilesetInfo(gid);
					var o = this._layerOrientation;
					var x = 0;
					var y = 0;
					if(o == dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ORTHO) {
						x = col * this._mapTileSize.width;
						y = row * this._mapTileSize.height;
					} else if(o == dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ISO) {
						x = this._mapTileSize.width / 2 * (this._layerSize.height + col - row - 1);
						y = this._mapTileSize.height / 2 * (row + col + 2) - tilesetInfo._tileSize.height;
					}
					var rect = tilesetInfo.rectForGID(gid);
					var sprite = new dev.tilemap.TMXSprite(rect,tilesetInfo.texture,dev.tilemap.TMXTiledMap.useViewport);
					sprite.setXY(x,y);
					sprite.alpha.set__(this._opacity / 255);
					this._root.addChild(new flambe.Entity().add(sprite),true,this._vertexZForPos(row,col));
					this._sprites.push(sprite);
				}
			}
		}
	}
	,initWithTilesetInfo: function(layerInfo,mapInfo) {
		var size = layerInfo._layerSize;
		this._mapInfo = mapInfo;
		this._layerInfo = layerInfo;
		this._layerSize = layerInfo._layerSize;
		this._layerName = layerInfo.name;
		this._tiles = layerInfo._tiles;
		this._minGID = layerInfo._minGID;
		this._maxGID = layerInfo._maxGID;
		this.setProperties(layerInfo.getProperties());
		this._opacity = layerInfo._opacity;
		this._parseInternalProperties();
		this._mapTileSize = mapInfo.getTileSize();
		this._layerOrientation = mapInfo.getOrientation();
		this._vertexZvalue = 0;
		return true;
	}
	,setProperties: function(v) {
		this._properties = v;
	}
	,__class__: dev.tilemap.TMXLayer
}
dev.tilemap.TMXObject = function(name,x,y,type,width,height,gid) {
	if(gid == null) gid = -1;
	this.isCircle = false;
	this.isPolyline = false;
	this.realY = -1;
	this.realX = -1;
	this.name = name;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.type = type;
	this.gid = gid;
	this.properties = new haxe.ds.StringMap();
};
$hxClasses["dev.tilemap.TMXObject"] = dev.tilemap.TMXObject;
dev.tilemap.TMXObject.__name__ = true;
dev.tilemap.TMXObject.prototype = {
	__class__: dev.tilemap.TMXObject
}
dev.tilemap.TMXObjectGroup = function() {
	this.opacity = 1;
	this.idx = 0;
	this.isRender = false;
	this._groupName = "";
	this._properties = new haxe.ds.StringMap();
	this._objects = new Array();
};
$hxClasses["dev.tilemap.TMXObjectGroup"] = dev.tilemap.TMXObjectGroup;
dev.tilemap.TMXObjectGroup.__name__ = true;
dev.tilemap.TMXObjectGroup.prototype = {
	setObjects: function(object) {
		this._objects.push(object);
	}
	,getObjects: function() {
		return this._objects;
	}
	,setGroupName: function(s) {
		this._groupName = s;
	}
	,getGroupName: function() {
		return this._groupName;
	}
	,setPositionOffset: function(v) {
		this._positionOffset = v;
	}
	,__class__: dev.tilemap.TMXObjectGroup
}
dev.tilemap.TMXSprite = function(rect,texture,isTiledMap) {
	if(isTiledMap == null) isTiledMap = false;
	flambe.display.Sprite.call(this);
	this.rect = rect;
	this.isTiledMap = isTiledMap;
	this.texture = texture;
};
$hxClasses["dev.tilemap.TMXSprite"] = dev.tilemap.TMXSprite;
dev.tilemap.TMXSprite.__name__ = true;
dev.tilemap.TMXSprite.__super__ = flambe.display.Sprite;
dev.tilemap.TMXSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalWidth: function() {
		if(this.rect == null) return 0;
		return this.rect.width;
	}
	,getNaturalHeight: function() {
		if(this.rect == null) return 0;
		return this.rect.height;
	}
	,draw: function(g) {
		if(this.isTiledMap) {
			var t = new dev.math.Rectangle(this.x.get__(),this.y.get__(),this.rect.width,this.rect.height);
			if(t.intersect(dev.tilemap.TMXTiledMap.viewport)) g.drawSubImage(this.texture,0,0,this.rect.x,this.rect.y,this.rect.width,this.rect.height);
		} else g.drawSubImage(this.texture,0,0,this.rect.x,this.rect.y,this.rect.width,this.rect.height);
	}
	,__class__: dev.tilemap.TMXSprite
});
dev.tilemap.TMXTiledMap = function(pack,tmxFile,resourcePath) {
	this._mapOrientation = 0;
	this._mapSize = new dev.math.Size();
	this._tileSize = new dev.math.Size();
	this._objectGroups = new Array();
	this._TMXLayers = new Array();
	this._pack = pack;
	this._root = new flambe.Entity();
	this.initWithTMXFile(tmxFile,resourcePath);
	this._sprite = new flambe.display.Sprite();
};
$hxClasses["dev.tilemap.TMXTiledMap"] = dev.tilemap.TMXTiledMap;
dev.tilemap.TMXTiledMap.__name__ = true;
dev.tilemap.TMXTiledMap.prototype = {
	getRoot: function() {
		return this._root;
	}
	,getObjectGroup: function(groupName) {
		flambe.util.Assert.that(groupName != null && groupName.length > 0,"Invalid group name!");
		if(this._objectGroups != null) {
			var _g = 0, _g1 = this._objectGroups;
			while(_g < _g1.length) {
				var o = _g1[_g];
				++_g;
				if(o != null && o.getGroupName() == groupName) return o;
			}
		}
		return null;
	}
	,_parseLayer: function(layerInfo,mapInfo) {
		var layer = dev.tilemap.TMXLayer.create(layerInfo,mapInfo);
		layer.setupTiles();
		return layer;
	}
	,_buildWithMapInfo: function(mapInfo) {
		this._mapSize = mapInfo.getMapSize();
		this._tileSize = mapInfo.getTileSize();
		this._mapOrientation = mapInfo.getOrientation();
		this._objectGroups = mapInfo.getObjectGroups();
		this._properties = mapInfo.getProperties();
		this._tileProperties = mapInfo.getTileProperties();
		var layers = mapInfo.getLayers();
		if(layers != null) {
			var _g = 0;
			while(_g < layers.length) {
				var l = layers[_g];
				++_g;
				var child = this._parseLayer(l,mapInfo);
				this._root.addChild(child.getRoot(),true,l.idx);
				this._TMXLayers.push(child);
			}
		}
		var objects = mapInfo.getObjectGroups();
		var _g = 0;
		while(_g < objects.length) {
			var obj = objects[_g];
			++_g;
			if(obj.isRender) {
				var _g1 = 0, _g2 = obj.getObjects();
				while(_g1 < _g2.length) {
					var o = _g2[_g1];
					++_g1;
					if(o.gid != -1) {
						var tilesets = mapInfo.getTilesets();
						var _g3 = 0;
						while(_g3 < tilesets.length) {
							var tileset = tilesets[_g3];
							++_g3;
							if(o.gid >= tileset.firstGid && o.gid <= tileset.lastGid || o.gid >= tileset.firstGid && tileset.lastGid == 0) {
								if(this._mapOrientation == dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ISO) {
									var rect = tileset.rectForGID(o.gid);
									var sprite = new dev.tilemap.TMXSprite(rect,tileset.texture);
									sprite.setAnchor(sprite.getNaturalWidth() / 2,sprite.getNaturalHeight());
									var x = o.x;
									var y = o.y;
									var tileWidth = this.getTileSize().width;
									var tileHeight = this.getTileSize().height;
									var edge = tileHeight;
									var yt = y / edge;
									var xt = x / edge;
									var retx = tileWidth / 2 * (this.getMapSize().height + xt - yt);
									var rety = tileHeight / 2 * (xt + yt);
									o.realX = retx;
									o.realY = rety;
									o.width = rect.width;
									o.height = rect.height;
									sprite.setXY(retx,rety);
									sprite.alpha.set__(obj.opacity);
									this._root.addChild(new flambe.Entity().add(sprite),true,obj.idx);
								} else if(this._mapOrientation == dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ORTHO) {
									var rect = tileset.rectForGID(o.gid);
									var x = o.x;
									var y = o.y;
									var realY = y - tileset.sourceImageHeight;
									var sprite = new dev.tilemap.TMXSprite(rect,tileset.texture);
									sprite.setXY(x,realY);
									sprite.alpha.set__(obj.opacity);
									this._root.addChild(new flambe.Entity().add(sprite),true,obj.idx);
								}
							}
						}
					}
				}
			}
		}
	}
	,initWithTMXFile: function(tmxFile,resourcePath) {
		flambe.util.Assert.that(tmxFile != null && tmxFile.length > 0,"TMXTiledMap: tmx file should not be nil");
		var mapInfo = dev.tilemap.TMXMapInfo.create(this._pack,tmxFile,resourcePath);
		if(mapInfo == null) return false;
		flambe.util.Assert.that(mapInfo.getTilesets().length != 0,"TMXTiledMap: Map not found. Please check the filename.");
		this._buildWithMapInfo(mapInfo);
		return true;
	}
	,getTileSize: function() {
		return this._tileSize;
	}
	,getMapSize: function() {
		return this._mapSize;
	}
	,__class__: dev.tilemap.TMXTiledMap
}
dev.tilemap.TMXXMLParser = function() { }
$hxClasses["dev.tilemap.TMXXMLParser"] = dev.tilemap.TMXXMLParser;
dev.tilemap.TMXXMLParser.__name__ = true;
dev.tilemap.TMXLayerInfo = function() {
	this.idx = 0;
	this._maxGID = 0;
	this._minGID = 100000;
	this.name = "";
	this.offset = new flambe.math.Point();
	this._properties = new haxe.ds.StringMap();
	this._tiles = new Array();
};
$hxClasses["dev.tilemap.TMXLayerInfo"] = dev.tilemap.TMXLayerInfo;
dev.tilemap.TMXLayerInfo.__name__ = true;
dev.tilemap.TMXLayerInfo.prototype = {
	setProperties: function(name,value) {
		this._properties.set(name,value);
	}
	,getProperties: function() {
		return this._properties;
	}
	,__class__: dev.tilemap.TMXLayerInfo
}
dev.tilemap.TMXTilesetInfo = function() {
	this.lastGid = 0;
	this.firstGid = 0;
	this.name = "";
	this._tileSize = new dev.math.Size();
};
$hxClasses["dev.tilemap.TMXTilesetInfo"] = dev.tilemap.TMXTilesetInfo;
dev.tilemap.TMXTilesetInfo.__name__ = true;
dev.tilemap.TMXTilesetInfo.prototype = {
	rectForGID: function(gid) {
		var rect = new dev.math.Rectangle();
		rect.width = this._tileSize.width;
		rect.height = this._tileSize.height;
		gid = gid - this.firstGid;
		var max_x = (this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing);
		rect.x = gid % max_x * (this._tileSize.width + this.spacing) + this.margin;
		rect.y = Std["int"](gid / max_x) * (this._tileSize.height + this.spacing) + this.margin;
		return rect;
	}
	,__class__: dev.tilemap.TMXTilesetInfo
}
dev.tilemap.TMXMapInfo = function(pack) {
	this.idx = 0;
	this._storingCharacters = false;
	this._tileProperties = new haxe.ds.IntMap();
	this._properties = new Array();
	this.pack = pack;
};
$hxClasses["dev.tilemap.TMXMapInfo"] = dev.tilemap.TMXMapInfo;
dev.tilemap.TMXMapInfo.__name__ = true;
dev.tilemap.TMXMapInfo.csvToArray = function(input) {
	var result = new Array();
	var rows = input.split("\n");
	var row;
	var _g = 0;
	while(_g < rows.length) {
		var row1 = rows[_g];
		++_g;
		if(row1 == "") continue;
		var resultRow = new Array();
		var entries = row1.split(",");
		var entry;
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry1 = entries[_g1];
			++_g1;
			var t = Std.parseInt(entry1);
			if(t != null) result.push(t);
		}
	}
	return result;
}
dev.tilemap.TMXMapInfo.create = function(pack,tmxFile,resourcePath) {
	var ret = new dev.tilemap.TMXMapInfo(pack);
	ret.initWithTMXFile(tmxFile,resourcePath);
	return ret;
}
dev.tilemap.TMXMapInfo.prototype = {
	_initernalInit: function(tmxFileName,resourcePath) {
		this._tileSets = new Array();
		this._layers = new Array();
		this._TMXFileName = tmxFileName;
		if(resourcePath != null) this._resources = resourcePath;
		this._objectGroups = new Array();
		this._currentString = "";
		this._storingCharacters = false;
		this._layerAttribs = dev.tilemap.TMXXMLParser.TMX_LAYER_ATTRIB_NONE;
		this._parentElement = dev.tilemap.TMXXMLParser.TMX_PROPERTY_NONE;
	}
	,getTileProperties: function() {
		return this._tileProperties;
	}
	,loadObjectGroup: function(xml) {
		var objectGroup = new dev.tilemap.TMXObjectGroup();
		objectGroup.setGroupName(xml.get("name"));
		var x;
		var y;
		var xStr = xml.get("x");
		var yStr = xml.get("y");
		if(xStr == null) x = 0; else x = Std.parseFloat(xStr);
		if(yStr == null) y = 0; else y = Std.parseFloat(yStr);
		objectGroup.setPositionOffset(new flambe.math.Point(x * this.getTileSize().width,y * this.getTileSize().height));
		if(xml.get("opacity") != null) objectGroup.opacity = Std.parseFloat(xml.get("opacity"));
		var $it0 = xml.elements();
		while( $it0.hasNext() ) {
			var elem = $it0.next();
			var object = new dev.tilemap.TMXObject();
			var _g = elem.get_nodeName();
			switch(_g) {
			case "object":
				object.name = elem.get("name");
				object.type = elem.get("type");
				object.x = Std.parseInt(elem.get("x"));
				object.y = Std.parseInt(elem.get("y"));
				object.width = Std.parseInt(elem.get("width"));
				object.height = Std.parseInt(elem.get("height"));
				if(elem.get("gid") != null) {
					object.gid = Std.parseInt(elem.get("gid"));
					objectGroup.isRender = true;
					objectGroup.idx = this.idx;
				} else object.gid = -1;
				var $it1 = elem.elements();
				while( $it1.hasNext() ) {
					var e = $it1.next();
					if(e.get_nodeName() == "polyline") {
						object.isPolyline = true;
						object.vertexs = new Array();
						var vertexs = e.get("points");
						var _g1 = 0, _g2 = vertexs.split(" ");
						while(_g1 < _g2.length) {
							var v = _g2[_g1];
							++_g1;
							var t = v.split(",");
							var point = new flambe.math.Point(Std.parseFloat(t[0]),Std.parseFloat(t[1]));
							object.vertexs.push(point);
						}
					} else if(e.get_nodeName() == "ellipse") object.isCircle = true;
				}
				break;
			case "properties":
				object.properties.set(elem.get("name"),elem.get("value"));
				break;
			}
			objectGroup.setObjects(object);
		}
		this.setObjectGroups(objectGroup);
	}
	,loadLayerPros: function(xml,layer) {
		var $it0 = xml.elements();
		while( $it0.hasNext() ) {
			var elem = $it0.next();
			layer.setProperties(elem.get("name"),elem.get("value"));
		}
	}
	,loadData: function(xml,layer) {
		var encoding = xml.get("encoding");
		var compression = xml.get("compression");
		if(compression == null) compression = "";
		var isCompression = false;
		switch(compression) {
		case "gzip":
			layer._tiles = dev.tilemap.TMXZipUtils.unzipBase64AsArray(xml.firstChild().get_nodeValue(),Std["int"](layer._layerSize.width),4);
			break;
		case "zlib":
			layer._tiles = dev.tilemap.TMXBase64.unzip(xml.firstChild().get_nodeValue(),Std["int"](layer._layerSize.width));
			break;
		case "":
			if(encoding == "base64") layer._tiles = dev.tilemap.TMXBase64.decodeAsArray(xml.firstChild().get_nodeValue(),Std["int"](layer._layerSize.width)); else if(encoding == "csv") layer._tiles = dev.tilemap.TMXMapInfo.csvToArray(xml.firstChild().get_nodeValue()); else {
				var indexX = 0;
				var indexY = 0;
				var widthMap = this._mapSize.width;
				var heightMap = this._mapSize.height;
				var tilesRow = new Array();
				var $it0 = xml.elements();
				while( $it0.hasNext() ) {
					var elem = $it0.next();
					var _g = elem.get_nodeName();
					switch(_g) {
					case "tile":
						layer._tiles.push(Std.parseInt(elem.get("gid")));
						break;
					default:
						null;
					}
				}
			}
			break;
		default:
			null;
		}
	}
	,loadLayer: function(elem) {
		var layer = new dev.tilemap.TMXLayerInfo();
		layer.name = elem.get("name");
		layer.idx = this.idx;
		var layerSize = new dev.math.Size();
		layerSize.width = Std.parseFloat(elem.get("width"));
		layerSize.height = Std.parseFloat(elem.get("height"));
		layer._layerSize = layerSize;
		var visible = elem.get("visible");
		if(visible == "0") layer.visible = false; else layer.visible = true;
		var opacity = elem.get("opacity");
		if(opacity == null) opacity = "1";
		layer._opacity = Std.parseInt(Std.string(255 * Std.parseFloat(opacity)));
		var x = elem.get("x");
		var y = elem.get("y");
		if(x == null) x = "0";
		if(y == null) y = "0";
		layer.offset = new flambe.math.Point(Std.parseFloat(x),Std.parseFloat(y));
		var nodeValue = "";
		var $it0 = elem.elements();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var _g = e.get_nodeName();
			switch(_g) {
			case "data":
				this.loadData(e,layer);
				break;
			case "properties":
				this.loadLayerPros(e,layer);
				break;
			}
		}
		this.setLayers(layer);
	}
	,loadTileset: function(elem) {
		var tileset = new dev.tilemap.TMXTilesetInfo();
		tileset.name = elem.get("name");
		tileset.firstGid = Std.parseInt(elem.get("firstgid"));
		var marginStr = elem.get("margin");
		if(marginStr == null) marginStr = "0";
		var spacingStr = elem.get("spacing");
		if(spacingStr == null) spacingStr = "0";
		tileset.margin = Std.parseInt(marginStr);
		tileset.spacing = Std.parseInt(spacingStr);
		var tilesetSize = new dev.math.Size();
		tilesetSize.width = Std.parseFloat(elem.get("tilewidth"));
		tilesetSize.height = Std.parseFloat(elem.get("tileheight"));
		tileset._tileSize = tilesetSize;
		var $it0 = elem.elements();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var _g = e.get_nodeName();
			switch(_g) {
			case "image":
				var imgSource = e.get("source");
				imgSource = imgSource.split(".")[0];
				if(imgSource != null) {
					if(this._resources != null) imgSource = this._resources + "/" + imgSource; else {
					}
				}
				tileset.sourceImage = imgSource;
				tileset.texture = this.pack.getTexture(tileset.sourceImage);
				tileset.sourceImageWidth = Std.parseFloat(e.get("width"));
				tileset.sourceImageHeight = Std.parseFloat(e.get("height"));
				tileset.imageSize = new dev.math.Size(tileset.sourceImageWidth,tileset.sourceImageHeight);
				if(this._tileSets.length != 0) this._tileSets[this._tileSets.length - 1].lastGid = tileset.firstGid - 1;
				this.setTilesets(tileset);
				break;
			case "tile":
				var info = this._tileSets[this._tileSets.length - 1];
				var id = Std.parseInt(e.get("id"));
				if(id == null) id = 0;
				this.setParentGID(info.firstGid + id);
				var dict = new haxe.ds.StringMap();
				var $it1 = e.elements();
				while( $it1.hasNext() ) {
					var p = $it1.next();
					var _g1 = p.get_nodeName();
					switch(_g1) {
					case "properties":
						var $it2 = p.elements();
						while( $it2.hasNext() ) {
							var pro = $it2.next();
							var _g2 = pro.get_nodeName();
							switch(_g2) {
							case "property":
								var name = pro.get("name");
								var value = pro.get("value");
								dict.set(name,value);
								break;
							}
						}
						break;
					}
				}
				this._tileProperties.set(this.getParentGID(),dict);
				break;
			default:
				null;
			}
		}
	}
	,loadProperties: function(elem) {
		var $it0 = elem.elements();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var _g = e.get_nodeName();
			switch(_g) {
			case "property":
				var map = new haxe.ds.StringMap();
				var v = e.get("value");
				map.set(e.get("name"),v);
				v;
				this.setProperties(map);
				break;
			default:
				null;
			}
		}
	}
	,parseXMLFile: function(tmxFile) {
		var map = Xml.parse(this.pack.getFile(tmxFile).toString()).firstElement();
		var version = map.get("version");
		var orientationStd = map.get("orientation");
		var mapSize = new dev.math.Size();
		mapSize.width = Std.parseFloat(map.get("width"));
		mapSize.height = Std.parseFloat(map.get("height"));
		this.setMapSize(mapSize);
		mapSize = new dev.math.Size();
		mapSize.width = Std.parseFloat(map.get("tilewidth"));
		mapSize.height = Std.parseFloat(map.get("tileheight"));
		this.setTileSize(mapSize);
		switch(orientationStd) {
		case "orthogonal":
			this.setOrientation(dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ORTHO);
			break;
		case "isometric":
			this.setOrientation(dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ISO);
			break;
		case "hexagonal":
			this.setOrientation(dev.tilemap.TMXTiledMap.TMX_ORIENTATION_HEX);
			break;
		default:
			null;
		}
		var indexOfTileset = 0;
		var $it0 = map.elements();
		while( $it0.hasNext() ) {
			var elem = $it0.next();
			var _g = elem.get_nodeName();
			switch(_g) {
			case "tileset":
				this.loadTileset(elem);
				break;
			case "layer":
				this.loadLayer(elem);
				this.idx++;
				break;
			case "objectgroup":
				this.loadObjectGroup(elem);
				this.idx++;
				break;
			case "properties":
				this.loadProperties(elem);
				break;
			}
		}
	}
	,initWithTMXFile: function(tmxFile,resourcePath) {
		this._initernalInit(tmxFile,resourcePath);
		return this.parseXMLFile(this._TMXFileName);
	}
	,setProperties: function(v) {
		this._properties.push(v);
	}
	,getProperties: function() {
		return this._properties;
	}
	,setParentGID: function(v) {
		this._parentGID = v;
	}
	,getParentGID: function() {
		return this._parentGID;
	}
	,setObjectGroups: function(v) {
		this._objectGroups.push(v);
	}
	,getObjectGroups: function() {
		return this._objectGroups;
	}
	,setTilesets: function(v) {
		this._tileSets.push(v);
	}
	,getTilesets: function() {
		return this._tileSets;
	}
	,setLayers: function(v) {
		this._layers.push(v);
	}
	,getLayers: function() {
		return this._layers;
	}
	,setTileSize: function(v) {
		this._tileSize = v;
	}
	,getTileSize: function() {
		return this._tileSize;
	}
	,setMapSize: function(v) {
		this._mapSize = v;
	}
	,getMapSize: function() {
		return this._mapSize;
	}
	,setOrientation: function(v) {
		this._orientation = v;
	}
	,getOrientation: function() {
		return this._orientation;
	}
	,__class__: dev.tilemap.TMXMapInfo
}
dev.tilemap.TMXZipUtils = function() { }
$hxClasses["dev.tilemap.TMXZipUtils"] = dev.tilemap.TMXZipUtils;
dev.tilemap.TMXZipUtils.__name__ = true;
dev.tilemap.TMXZipUtils.unzipBase64 = function(input) {
	var tmpInput = dev.tilemap.TMXBase64.decode(input);
	return dev.tilemap.TMXGZip.gunzip(tmpInput);
}
dev.tilemap.TMXZipUtils.unzipBase64AsArray = function(input,lineWidth,bytes) {
	if(bytes == null) bytes = 1;
	var dec = dev.tilemap.TMXZipUtils.unzipBase64(input);
	var ar = [];
	var len = Std["int"](dec.length / bytes);
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ar[i] = 0;
		var j = bytes - 1;
		while(j >= 0) {
			var t = HxOverrides.cca(dec,i * bytes + j) << j * 8;
			ar[i] += t;
			j--;
		}
	}
	return ar;
}
flambe.Disposer = function() {
	this._disposables = [];
};
$hxClasses["flambe.Disposer"] = flambe.Disposer;
flambe.Disposer.__name__ = true;
flambe.Disposer.__super__ = flambe.Component;
flambe.Disposer.prototype = $extend(flambe.Component.prototype,{
	freeDisposables: function() {
		var snapshot = this._disposables;
		this._disposables = [];
		var _g = 0;
		while(_g < snapshot.length) {
			var disposable = snapshot[_g];
			++_g;
			disposable.dispose();
		}
	}
	,dispose: function() {
		flambe.Component.prototype.dispose.call(this);
		this.freeDisposables();
	}
	,onRemoved: function() {
		this.freeDisposables();
	}
	,connect1: function(signal,listener) {
		this.add(signal.connect(listener));
		return this;
	}
	,add: function(disposable) {
		this._disposables.push(disposable);
		return this;
	}
	,get_name: function() {
		return "Disposer_10";
	}
	,__class__: flambe.Disposer
});
flambe.Entity = function() {
	this.zOrder = 0;
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe.Entity;
flambe.Entity.__name__ = true;
flambe.Entity.__interfaces__ = [flambe.util.Disposable];
flambe.Entity.prototype = {
	toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
	}
	,toString: function() {
		return this.toStringImpl("");
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,removeChild: function(entity) {
		var prev = null, p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,addChild: function(entity,append,zOrder) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null, p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) {
				if(zOrder == null) zOrder = tail.zOrder;
				if(tail.zOrder <= zOrder) tail.next = entity; else {
					var p1 = this.firstChild;
					var pre = null;
					while(p1 != null) if(p1.zOrder > zOrder) {
						if(pre != null) {
							pre.next = entity;
							entity.next = p1;
						} else {
							entity.next = this.firstChild;
							this.firstChild = entity;
						}
						break;
					} else {
						pre = p1;
						p1 = p1.next;
					}
				}
			} else {
				this.firstChild = entity;
				if(zOrder == null) zOrder = 0;
			}
		} else {
			if(this.firstChild == null) zOrder = 0; else zOrder = this.firstChild.zOrder - 1;
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		entity.zOrder = zOrder;
		return this;
	}
	,getComponent: function(name) {
		return this._compMap[name];
	}
	,remove: function(component) {
		var prev = null, p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev.init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p.init(null,null);
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null, p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.setNext(component); else this.firstComponent = component;
		component.init(this,null);
		component.onAdded();
		return this;
	}
	,__class__: flambe.Entity
}
flambe.util.PackageLog = function() { }
$hxClasses["flambe.util.PackageLog"] = flambe.util.PackageLog;
flambe.util.PackageLog.__name__ = true;
flambe.platform = {}
flambe.platform.Platform = function() { }
$hxClasses["flambe.platform.Platform"] = flambe.platform.Platform;
flambe.platform.Platform.__name__ = true;
flambe.platform.Platform.prototype = {
	__class__: flambe.platform.Platform
}
flambe.platform.html = {}
flambe.platform.html.HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe.platform.html.HtmlPlatform;
flambe.platform.html.HtmlPlatform.__name__ = true;
flambe.platform.html.HtmlPlatform.__interfaces__ = [flambe.platform.Platform];
flambe.platform.html.HtmlPlatform.prototype = {
	createRenderer: function(canvas) {
		return new flambe.platform.html.CanvasRenderer(canvas);
		flambe.Log.error("No renderer available!");
		return null;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getKeyboard: function() {
		var _g = this;
		if(this._keyboard == null) {
			this._keyboard = new flambe.platform.BasicKeyboard();
			var onKey = function(event) {
				switch(event.type) {
				case "keydown":
					if(_g._keyboard.submitDown(event.keyCode)) event.preventDefault();
					break;
				case "keyup":
					_g._keyboard.submitUp(event.keyCode);
					break;
				}
			};
			this._canvas.addEventListener("keydown",onKey,false);
			this._canvas.addEventListener("keyup",onKey,false);
		}
		return this._keyboard;
	}
	,getPointer: function() {
		return this._pointer;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe.System.hidden.get__()) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getCatapultClient: function() {
		return this._catapult;
	}
	,createLogHandler: function(tag) {
		if(flambe.platform.html.HtmlLogHandler.isSupported()) return new flambe.platform.html.HtmlLogHandler(tag);
		return null;
	}
	,getStage: function() {
		return this._stage;
	}
	,loadAssetPack: function(manifest) {
		return new flambe.platform.html.HtmlAssetPackLoader(this,manifest).promise;
	}
	,init: function() {
		var _g = this;
		flambe.platform.html.HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js.Browser.window.flambe.canvas;
		} catch( error ) {
		}
		flambe.util.Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe.platform.html.HtmlStage(canvas);
		this._pointer = new flambe.platform.BasicPointer();
		this._mouse = new flambe.platform.html.HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe.platform.MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			switch(event.type) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity = event.type == "mousewheel"?event.wheelDelta / 40:-event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js.Browser.window.addEventListener("mousedown",onMouse,false);
		js.Browser.window.addEventListener("mousemove",onMouse,false);
		js.Browser.window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		var standardTouch = typeof(js.Browser.window.ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe.platform.BasicTouch(this._pointer,standardTouch?4:js.Browser.navigator.msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event) {
				var changedTouches = standardTouch?event.changedTouches:[event];
				var bounds = event.target.getBoundingClientRect();
				lastTouchTime = event.timeStamp;
				switch(event.type) {
				case "touchstart":case "MSPointerDown":
					event.preventDefault();
					if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe.platform.html.HtmlUtil.hideMobileBrowser();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitDown(id,x,y);
					}
					break;
				case "touchmove":case "MSPointerMove":
					event.preventDefault();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitMove(id,x,y);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitUp(id,x,y);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe.platform.DummyTouch();
		var oldErrorHandler = js.Browser.window.onerror;
		js.Browser.window.onerror = function(message,url,line) {
			flambe.System.uncaughtError.emit(message);
			return oldErrorHandler != null?oldErrorHandler(message,url,line):false;
		};
		var hiddenApi = flambe.platform.html.HtmlUtil.loadExtension("hidden",js.Browser.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe.System.hidden.set__(Reflect.field(js.Browser.document,hiddenApi.field));
			};
			onVisibilityChanged(null);
			js.Browser.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event) {
				flambe.System.hidden.set__(event.type == "pagehide");
			};
			js.Browser.window.addEventListener("pageshow",onPageTransitionChange,false);
			js.Browser.window.addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe.System.hidden.get_changed().connect(function(hidden,_) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = flambe.platform.html.HtmlUtil.now();
		var requestAnimationFrame = flambe.platform.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js.Browser.window.performance;
			var hasPerfNow = performance != null && flambe.platform.html.HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe.Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe.Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js.Browser.window.setInterval(function() {
				_g.update(flambe.platform.html.HtmlUtil.now());
			},16);
		}
		new flambe.platform.DebugLogic(this);
		this._catapult = flambe.platform.html.HtmlCatapultClient.canUse()?new flambe.platform.html.HtmlCatapultClient():null;
		flambe.Log.info("Initialized HTML platform",["renderer",this._renderer.getName()]);
	}
	,__class__: flambe.platform.html.HtmlPlatform
}
flambe.util.Value = function(value,listener) {
	this._value = value;
	this._changed = listener != null?new flambe.util.Signal2(listener):null;
};
$hxClasses["flambe.util.Value"] = flambe.util.Value;
flambe.util.Value.__name__ = true;
flambe.util.Value.prototype = {
	toString: function() {
		return this._value;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe.util.Signal2();
		return this._changed;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get__: function() {
		return this._value;
	}
	,watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,__class__: flambe.util.Value
}
flambe.util.SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe.util.SignalConnection;
flambe.util.SignalConnection.__name__ = true;
flambe.util.SignalConnection.__interfaces__ = [flambe.util.Disposable];
flambe.util.SignalConnection.prototype = {
	dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,once: function() {
		this.stayInList = false;
		return this;
	}
	,__class__: flambe.util.SignalConnection
}
flambe.util.SignalBase = function(listener) {
	this._head = listener != null?new flambe.util.SignalConnection(this,listener):null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe.util.SignalBase;
flambe.util.SignalBase.__name__ = true;
flambe.util.SignalBase.prototype = {
	dispatching: function() {
		return this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL;
	}
	,listRemove: function(conn) {
		var prev = null, p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null, p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,willEmit: function() {
		flambe.util.Assert.that(!this.dispatching());
		var snapshot = this._head;
		this._head = flambe.util.SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,defer: function(fn) {
		var tail = null, p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe.util._SignalBase.Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe.util.SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,hasListeners: function() {
		return this._head != null;
	}
	,__class__: flambe.util.SignalBase
}
flambe.util.Signal2 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe.util.Signal2;
flambe.util.Signal2.__name__ = true;
flambe.util.Signal2.__super__ = flambe.util.SignalBase;
flambe.util.Signal2.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal2
});
flambe.util.Signal1 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe.util.Signal1;
flambe.util.Signal1.__name__ = true;
flambe.util.Signal1.__super__ = flambe.util.SignalBase;
flambe.util.Signal1.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal1
});
flambe.animation = {}
flambe.animation.AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe.util.Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe.animation.AnimatedFloat;
flambe.animation.AnimatedFloat.__name__ = true;
flambe.animation.AnimatedFloat.__super__ = flambe.util.Value;
flambe.animation.AnimatedFloat.prototype = $extend(flambe.util.Value.prototype,{
	update: function(dt) {
		if(this._behavior != null) {
			flambe.util.Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,set__: function(value) {
		this._behavior = null;
		return flambe.util.Value.prototype.set__.call(this,value);
	}
	,__class__: flambe.animation.AnimatedFloat
});
flambe.System = function() { }
$hxClasses["flambe.System"] = flambe.System;
flambe.System.__name__ = true;
flambe.System.init = function() {
	if(!flambe.System._calledInit) {
		flambe.System._platform.init();
		flambe.System._calledInit = true;
	}
}
flambe.System.loadAssetPack = function(manifest) {
	flambe.System.assertCalledInit();
	return flambe.System._platform.loadAssetPack(manifest);
}
flambe.System.createTexture = function(width,height) {
	flambe.System.assertCalledInit();
	var texture = flambe.System._platform.getRenderer().createEmptyTexture(width,height);
	if(texture == null) flambe.Log.warn("Failed to create texture. Is the GPU context unavailable?");
	return texture;
}
flambe.System.createLogger = function(tag) {
	return new flambe.util.Logger(flambe.System._platform.createLogHandler(tag));
}
flambe.System.get_stage = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getStage();
}
flambe.System.get_pointer = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getPointer();
}
flambe.System.assertCalledInit = function() {
	flambe.util.Assert.that(flambe.System._calledInit,"You must call System.init() first");
}
flambe.util.Logger = function(handler) {
	this._handler = handler;
};
$hxClasses["flambe.util.Logger"] = flambe.util.Logger;
flambe.util.Logger.__name__ = true;
flambe.util.Logger.prototype = {
	log: function(level,text,args) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(args != null) text = flambe.util.Strings.withFields(text,args);
		this._handler.log(level,text);
	}
	,error: function(text,args) {
		this.log(flambe.util.LogLevel.Error,text,args);
	}
	,warn: function(text,args) {
		this.log(flambe.util.LogLevel.Warn,text,args);
	}
	,info: function(text,args) {
		this.log(flambe.util.LogLevel.Info,text,args);
	}
	,__class__: flambe.util.Logger
}
flambe.Log = function() { }
$hxClasses["flambe.Log"] = flambe.Log;
flambe.Log.__name__ = true;
flambe.Log.info = function(text,args) {
	flambe.Log.logger.info(text,args);
}
flambe.Log.warn = function(text,args) {
	flambe.Log.logger.warn(text,args);
}
flambe.Log.error = function(text,args) {
	flambe.Log.logger.error(text,args);
}
flambe.Log.__super__ = flambe.util.PackageLog;
flambe.Log.prototype = $extend(flambe.util.PackageLog.prototype,{
	__class__: flambe.Log
});
flambe.SpeedAdjuster = function() {
	this._realDt = 0;
};
$hxClasses["flambe.SpeedAdjuster"] = flambe.SpeedAdjuster;
flambe.SpeedAdjuster.__name__ = true;
flambe.SpeedAdjuster.__super__ = flambe.Component;
flambe.SpeedAdjuster.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,get_name: function() {
		return "SpeedAdjuster_1";
	}
	,__class__: flambe.SpeedAdjuster
});
flambe.animation.Behavior = function() { }
$hxClasses["flambe.animation.Behavior"] = flambe.animation.Behavior;
flambe.animation.Behavior.__name__ = true;
flambe.animation.Behavior.prototype = {
	__class__: flambe.animation.Behavior
}
flambe.asset = {}
flambe.asset.Asset = function() { }
$hxClasses["flambe.asset.Asset"] = flambe.asset.Asset;
flambe.asset.Asset.__name__ = true;
flambe.asset.Asset.__interfaces__ = [flambe.util.Disposable];
flambe.asset.Asset.prototype = {
	__class__: flambe.asset.Asset
}
flambe.asset.AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : true, __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] }
flambe.asset.AssetFormat.WEBP = ["WEBP",0];
flambe.asset.AssetFormat.WEBP.toString = $estr;
flambe.asset.AssetFormat.WEBP.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JXR = ["JXR",1];
flambe.asset.AssetFormat.JXR.toString = $estr;
flambe.asset.AssetFormat.JXR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PNG = ["PNG",2];
flambe.asset.AssetFormat.PNG.toString = $estr;
flambe.asset.AssetFormat.PNG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JPG = ["JPG",3];
flambe.asset.AssetFormat.JPG.toString = $estr;
flambe.asset.AssetFormat.JPG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.GIF = ["GIF",4];
flambe.asset.AssetFormat.GIF.toString = $estr;
flambe.asset.AssetFormat.GIF.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.DDS = ["DDS",5];
flambe.asset.AssetFormat.DDS.toString = $estr;
flambe.asset.AssetFormat.DDS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PVR = ["PVR",6];
flambe.asset.AssetFormat.PVR.toString = $estr;
flambe.asset.AssetFormat.PVR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PKM = ["PKM",7];
flambe.asset.AssetFormat.PKM.toString = $estr;
flambe.asset.AssetFormat.PKM.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.MP3 = ["MP3",8];
flambe.asset.AssetFormat.MP3.toString = $estr;
flambe.asset.AssetFormat.MP3.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.M4A = ["M4A",9];
flambe.asset.AssetFormat.M4A.toString = $estr;
flambe.asset.AssetFormat.M4A.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OPUS = ["OPUS",10];
flambe.asset.AssetFormat.OPUS.toString = $estr;
flambe.asset.AssetFormat.OPUS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OGG = ["OGG",11];
flambe.asset.AssetFormat.OGG.toString = $estr;
flambe.asset.AssetFormat.OGG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.WAV = ["WAV",12];
flambe.asset.AssetFormat.WAV.toString = $estr;
flambe.asset.AssetFormat.WAV.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.Data = ["Data",13];
flambe.asset.AssetFormat.Data.toString = $estr;
flambe.asset.AssetFormat.Data.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe.asset.AssetEntry;
flambe.asset.AssetEntry.__name__ = true;
flambe.asset.AssetEntry.prototype = {
	__class__: flambe.asset.AssetEntry
}
flambe.asset.AssetPack = function() { }
$hxClasses["flambe.asset.AssetPack"] = flambe.asset.AssetPack;
flambe.asset.AssetPack.__name__ = true;
flambe.asset.AssetPack.__interfaces__ = [flambe.util.Disposable];
flambe.asset.AssetPack.prototype = {
	__class__: flambe.asset.AssetPack
}
flambe.asset.File = function() { }
$hxClasses["flambe.asset.File"] = flambe.asset.File;
flambe.asset.File.__name__ = true;
flambe.asset.File.__interfaces__ = [flambe.asset.Asset];
flambe.asset.File.prototype = {
	__class__: flambe.asset.File
}
var js = {}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = true;
flambe.asset.Manifest = function() {
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe.asset.Manifest;
flambe.asset.Manifest.__name__ = true;
flambe.asset.Manifest.build = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe.rtti.Meta.getType(flambe.asset.Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw flambe.util.Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	var manifest = new flambe.asset.Manifest();
	manifest.set_relativeBasePath("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe.asset.Manifest.inferFormat(name);
		if(format != flambe.asset.AssetFormat.Data) name = flambe.util.Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
}
flambe.asset.Manifest.inferFormat = function(url) {
	var extension = flambe.util.Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe.asset.AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe.asset.AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe.asset.AssetFormat.JXR;
		case "png":
			return flambe.asset.AssetFormat.PNG;
		case "webp":
			return flambe.asset.AssetFormat.WEBP;
		case "dds":
			return flambe.asset.AssetFormat.DDS;
		case "pvr":
			return flambe.asset.AssetFormat.PVR;
		case "pkm":
			return flambe.asset.AssetFormat.PKM;
		case "m4a":
			return flambe.asset.AssetFormat.M4A;
		case "mp3":
			return flambe.asset.AssetFormat.MP3;
		case "ogg":
			return flambe.asset.AssetFormat.OGG;
		case "opus":
			return flambe.asset.AssetFormat.OPUS;
		case "wav":
			return flambe.asset.AssetFormat.WAV;
		}
	} else flambe.Log.warn("No file extension for asset, it will be loaded as data",["url",url]);
	return flambe.asset.AssetFormat.Data;
}
flambe.asset.Manifest.prototype = {
	get_externalBasePath: function() {
		return this._externalBasePath;
	}
	,set_relativeBasePath: function(basePath) {
		this._relativeBasePath = basePath;
		if(basePath != null) flambe.util.Assert.that(!StringTools.startsWith(basePath,"http://") && !StringTools.startsWith(basePath,"https://"),"relativeBasePath must be a relative path on the same domain, NOT starting with http(s)://");
		return basePath;
	}
	,get_relativeBasePath: function() {
		return this._relativeBasePath;
	}
	,getFullURL: function(entry) {
		var restricted = this.get_externalBasePath() != null && flambe.asset.Manifest._supportsCrossOrigin?this.get_externalBasePath():this.get_relativeBasePath();
		var unrestricted = this.get_externalBasePath() != null?this.get_externalBasePath():this.get_relativeBasePath();
		var base = unrestricted;
		if(entry.format == flambe.asset.AssetFormat.Data) base = restricted;
		return base != null?flambe.util.Strings.joinPath(base,entry.url):entry.url;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe.asset.Manifest.inferFormat(url);
		var entry = new flambe.asset.AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,__class__: flambe.asset.Manifest
}
flambe.display.BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : true, __constructs__ : ["Normal","Add","Mask","Copy"] }
flambe.display.BlendMode.Normal = ["Normal",0];
flambe.display.BlendMode.Normal.toString = $estr;
flambe.display.BlendMode.Normal.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Add = ["Add",1];
flambe.display.BlendMode.Add.toString = $estr;
flambe.display.BlendMode.Add.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Mask = ["Mask",2];
flambe.display.BlendMode.Mask.toString = $estr;
flambe.display.BlendMode.Mask.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Copy = ["Copy",3];
flambe.display.BlendMode.Copy.toString = $estr;
flambe.display.BlendMode.Copy.__enum__ = flambe.display.BlendMode;
flambe.display.Graphics = function() { }
$hxClasses["flambe.display.Graphics"] = flambe.display.Graphics;
flambe.display.Graphics.__name__ = true;
flambe.display.Graphics.prototype = {
	__class__: flambe.display.Graphics
}
flambe.display.ImageSprite = function(texture) {
	flambe.display.Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe.display.ImageSprite;
flambe.display.ImageSprite.__name__ = true;
flambe.display.ImageSprite.__super__ = flambe.display.Sprite;
flambe.display.ImageSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.texture.get_height();
	}
	,getNaturalWidth: function() {
		return this.texture.get_width();
	}
	,draw: function(g) {
		g.drawImage(this.texture,0,0);
	}
	,__class__: flambe.display.ImageSprite
});
flambe.display.Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] }
flambe.display.Orientation.Portrait = ["Portrait",0];
flambe.display.Orientation.Portrait.toString = $estr;
flambe.display.Orientation.Portrait.__enum__ = flambe.display.Orientation;
flambe.display.Orientation.Landscape = ["Landscape",1];
flambe.display.Orientation.Landscape.toString = $estr;
flambe.display.Orientation.Landscape.__enum__ = flambe.display.Orientation;
flambe.display.Texture = function() { }
$hxClasses["flambe.display.Texture"] = flambe.display.Texture;
flambe.display.Texture.__name__ = true;
flambe.display.Texture.__interfaces__ = [flambe.asset.Asset];
flambe.display.Texture.prototype = {
	__class__: flambe.display.Texture
}
flambe.input = {}
flambe.input.Key = $hxClasses["flambe.input.Key"] = { __ename__ : true, __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] }
flambe.input.Key.A = ["A",0];
flambe.input.Key.A.toString = $estr;
flambe.input.Key.A.__enum__ = flambe.input.Key;
flambe.input.Key.B = ["B",1];
flambe.input.Key.B.toString = $estr;
flambe.input.Key.B.__enum__ = flambe.input.Key;
flambe.input.Key.C = ["C",2];
flambe.input.Key.C.toString = $estr;
flambe.input.Key.C.__enum__ = flambe.input.Key;
flambe.input.Key.D = ["D",3];
flambe.input.Key.D.toString = $estr;
flambe.input.Key.D.__enum__ = flambe.input.Key;
flambe.input.Key.E = ["E",4];
flambe.input.Key.E.toString = $estr;
flambe.input.Key.E.__enum__ = flambe.input.Key;
flambe.input.Key.F = ["F",5];
flambe.input.Key.F.toString = $estr;
flambe.input.Key.F.__enum__ = flambe.input.Key;
flambe.input.Key.G = ["G",6];
flambe.input.Key.G.toString = $estr;
flambe.input.Key.G.__enum__ = flambe.input.Key;
flambe.input.Key.H = ["H",7];
flambe.input.Key.H.toString = $estr;
flambe.input.Key.H.__enum__ = flambe.input.Key;
flambe.input.Key.I = ["I",8];
flambe.input.Key.I.toString = $estr;
flambe.input.Key.I.__enum__ = flambe.input.Key;
flambe.input.Key.J = ["J",9];
flambe.input.Key.J.toString = $estr;
flambe.input.Key.J.__enum__ = flambe.input.Key;
flambe.input.Key.K = ["K",10];
flambe.input.Key.K.toString = $estr;
flambe.input.Key.K.__enum__ = flambe.input.Key;
flambe.input.Key.L = ["L",11];
flambe.input.Key.L.toString = $estr;
flambe.input.Key.L.__enum__ = flambe.input.Key;
flambe.input.Key.M = ["M",12];
flambe.input.Key.M.toString = $estr;
flambe.input.Key.M.__enum__ = flambe.input.Key;
flambe.input.Key.N = ["N",13];
flambe.input.Key.N.toString = $estr;
flambe.input.Key.N.__enum__ = flambe.input.Key;
flambe.input.Key.O = ["O",14];
flambe.input.Key.O.toString = $estr;
flambe.input.Key.O.__enum__ = flambe.input.Key;
flambe.input.Key.P = ["P",15];
flambe.input.Key.P.toString = $estr;
flambe.input.Key.P.__enum__ = flambe.input.Key;
flambe.input.Key.Q = ["Q",16];
flambe.input.Key.Q.toString = $estr;
flambe.input.Key.Q.__enum__ = flambe.input.Key;
flambe.input.Key.R = ["R",17];
flambe.input.Key.R.toString = $estr;
flambe.input.Key.R.__enum__ = flambe.input.Key;
flambe.input.Key.S = ["S",18];
flambe.input.Key.S.toString = $estr;
flambe.input.Key.S.__enum__ = flambe.input.Key;
flambe.input.Key.T = ["T",19];
flambe.input.Key.T.toString = $estr;
flambe.input.Key.T.__enum__ = flambe.input.Key;
flambe.input.Key.U = ["U",20];
flambe.input.Key.U.toString = $estr;
flambe.input.Key.U.__enum__ = flambe.input.Key;
flambe.input.Key.V = ["V",21];
flambe.input.Key.V.toString = $estr;
flambe.input.Key.V.__enum__ = flambe.input.Key;
flambe.input.Key.W = ["W",22];
flambe.input.Key.W.toString = $estr;
flambe.input.Key.W.__enum__ = flambe.input.Key;
flambe.input.Key.X = ["X",23];
flambe.input.Key.X.toString = $estr;
flambe.input.Key.X.__enum__ = flambe.input.Key;
flambe.input.Key.Y = ["Y",24];
flambe.input.Key.Y.toString = $estr;
flambe.input.Key.Y.__enum__ = flambe.input.Key;
flambe.input.Key.Z = ["Z",25];
flambe.input.Key.Z.toString = $estr;
flambe.input.Key.Z.__enum__ = flambe.input.Key;
flambe.input.Key.Number0 = ["Number0",26];
flambe.input.Key.Number0.toString = $estr;
flambe.input.Key.Number0.__enum__ = flambe.input.Key;
flambe.input.Key.Number1 = ["Number1",27];
flambe.input.Key.Number1.toString = $estr;
flambe.input.Key.Number1.__enum__ = flambe.input.Key;
flambe.input.Key.Number2 = ["Number2",28];
flambe.input.Key.Number2.toString = $estr;
flambe.input.Key.Number2.__enum__ = flambe.input.Key;
flambe.input.Key.Number3 = ["Number3",29];
flambe.input.Key.Number3.toString = $estr;
flambe.input.Key.Number3.__enum__ = flambe.input.Key;
flambe.input.Key.Number4 = ["Number4",30];
flambe.input.Key.Number4.toString = $estr;
flambe.input.Key.Number4.__enum__ = flambe.input.Key;
flambe.input.Key.Number5 = ["Number5",31];
flambe.input.Key.Number5.toString = $estr;
flambe.input.Key.Number5.__enum__ = flambe.input.Key;
flambe.input.Key.Number6 = ["Number6",32];
flambe.input.Key.Number6.toString = $estr;
flambe.input.Key.Number6.__enum__ = flambe.input.Key;
flambe.input.Key.Number7 = ["Number7",33];
flambe.input.Key.Number7.toString = $estr;
flambe.input.Key.Number7.__enum__ = flambe.input.Key;
flambe.input.Key.Number8 = ["Number8",34];
flambe.input.Key.Number8.toString = $estr;
flambe.input.Key.Number8.__enum__ = flambe.input.Key;
flambe.input.Key.Number9 = ["Number9",35];
flambe.input.Key.Number9.toString = $estr;
flambe.input.Key.Number9.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad0 = ["Numpad0",36];
flambe.input.Key.Numpad0.toString = $estr;
flambe.input.Key.Numpad0.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad1 = ["Numpad1",37];
flambe.input.Key.Numpad1.toString = $estr;
flambe.input.Key.Numpad1.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad2 = ["Numpad2",38];
flambe.input.Key.Numpad2.toString = $estr;
flambe.input.Key.Numpad2.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad3 = ["Numpad3",39];
flambe.input.Key.Numpad3.toString = $estr;
flambe.input.Key.Numpad3.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad4 = ["Numpad4",40];
flambe.input.Key.Numpad4.toString = $estr;
flambe.input.Key.Numpad4.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad5 = ["Numpad5",41];
flambe.input.Key.Numpad5.toString = $estr;
flambe.input.Key.Numpad5.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad6 = ["Numpad6",42];
flambe.input.Key.Numpad6.toString = $estr;
flambe.input.Key.Numpad6.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad7 = ["Numpad7",43];
flambe.input.Key.Numpad7.toString = $estr;
flambe.input.Key.Numpad7.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad8 = ["Numpad8",44];
flambe.input.Key.Numpad8.toString = $estr;
flambe.input.Key.Numpad8.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad9 = ["Numpad9",45];
flambe.input.Key.Numpad9.toString = $estr;
flambe.input.Key.Numpad9.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadAdd = ["NumpadAdd",46];
flambe.input.Key.NumpadAdd.toString = $estr;
flambe.input.Key.NumpadAdd.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDecimal = ["NumpadDecimal",47];
flambe.input.Key.NumpadDecimal.toString = $estr;
flambe.input.Key.NumpadDecimal.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDivide = ["NumpadDivide",48];
flambe.input.Key.NumpadDivide.toString = $estr;
flambe.input.Key.NumpadDivide.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadEnter = ["NumpadEnter",49];
flambe.input.Key.NumpadEnter.toString = $estr;
flambe.input.Key.NumpadEnter.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadMultiply = ["NumpadMultiply",50];
flambe.input.Key.NumpadMultiply.toString = $estr;
flambe.input.Key.NumpadMultiply.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadSubtract = ["NumpadSubtract",51];
flambe.input.Key.NumpadSubtract.toString = $estr;
flambe.input.Key.NumpadSubtract.__enum__ = flambe.input.Key;
flambe.input.Key.F1 = ["F1",52];
flambe.input.Key.F1.toString = $estr;
flambe.input.Key.F1.__enum__ = flambe.input.Key;
flambe.input.Key.F2 = ["F2",53];
flambe.input.Key.F2.toString = $estr;
flambe.input.Key.F2.__enum__ = flambe.input.Key;
flambe.input.Key.F3 = ["F3",54];
flambe.input.Key.F3.toString = $estr;
flambe.input.Key.F3.__enum__ = flambe.input.Key;
flambe.input.Key.F4 = ["F4",55];
flambe.input.Key.F4.toString = $estr;
flambe.input.Key.F4.__enum__ = flambe.input.Key;
flambe.input.Key.F5 = ["F5",56];
flambe.input.Key.F5.toString = $estr;
flambe.input.Key.F5.__enum__ = flambe.input.Key;
flambe.input.Key.F6 = ["F6",57];
flambe.input.Key.F6.toString = $estr;
flambe.input.Key.F6.__enum__ = flambe.input.Key;
flambe.input.Key.F7 = ["F7",58];
flambe.input.Key.F7.toString = $estr;
flambe.input.Key.F7.__enum__ = flambe.input.Key;
flambe.input.Key.F8 = ["F8",59];
flambe.input.Key.F8.toString = $estr;
flambe.input.Key.F8.__enum__ = flambe.input.Key;
flambe.input.Key.F9 = ["F9",60];
flambe.input.Key.F9.toString = $estr;
flambe.input.Key.F9.__enum__ = flambe.input.Key;
flambe.input.Key.F10 = ["F10",61];
flambe.input.Key.F10.toString = $estr;
flambe.input.Key.F10.__enum__ = flambe.input.Key;
flambe.input.Key.F11 = ["F11",62];
flambe.input.Key.F11.toString = $estr;
flambe.input.Key.F11.__enum__ = flambe.input.Key;
flambe.input.Key.F12 = ["F12",63];
flambe.input.Key.F12.toString = $estr;
flambe.input.Key.F12.__enum__ = flambe.input.Key;
flambe.input.Key.F13 = ["F13",64];
flambe.input.Key.F13.toString = $estr;
flambe.input.Key.F13.__enum__ = flambe.input.Key;
flambe.input.Key.F14 = ["F14",65];
flambe.input.Key.F14.toString = $estr;
flambe.input.Key.F14.__enum__ = flambe.input.Key;
flambe.input.Key.F15 = ["F15",66];
flambe.input.Key.F15.toString = $estr;
flambe.input.Key.F15.__enum__ = flambe.input.Key;
flambe.input.Key.Left = ["Left",67];
flambe.input.Key.Left.toString = $estr;
flambe.input.Key.Left.__enum__ = flambe.input.Key;
flambe.input.Key.Up = ["Up",68];
flambe.input.Key.Up.toString = $estr;
flambe.input.Key.Up.__enum__ = flambe.input.Key;
flambe.input.Key.Right = ["Right",69];
flambe.input.Key.Right.toString = $estr;
flambe.input.Key.Right.__enum__ = flambe.input.Key;
flambe.input.Key.Down = ["Down",70];
flambe.input.Key.Down.toString = $estr;
flambe.input.Key.Down.__enum__ = flambe.input.Key;
flambe.input.Key.Alt = ["Alt",71];
flambe.input.Key.Alt.toString = $estr;
flambe.input.Key.Alt.__enum__ = flambe.input.Key;
flambe.input.Key.Backquote = ["Backquote",72];
flambe.input.Key.Backquote.toString = $estr;
flambe.input.Key.Backquote.__enum__ = flambe.input.Key;
flambe.input.Key.Backslash = ["Backslash",73];
flambe.input.Key.Backslash.toString = $estr;
flambe.input.Key.Backslash.__enum__ = flambe.input.Key;
flambe.input.Key.Backspace = ["Backspace",74];
flambe.input.Key.Backspace.toString = $estr;
flambe.input.Key.Backspace.__enum__ = flambe.input.Key;
flambe.input.Key.CapsLock = ["CapsLock",75];
flambe.input.Key.CapsLock.toString = $estr;
flambe.input.Key.CapsLock.__enum__ = flambe.input.Key;
flambe.input.Key.Comma = ["Comma",76];
flambe.input.Key.Comma.toString = $estr;
flambe.input.Key.Comma.__enum__ = flambe.input.Key;
flambe.input.Key.Command = ["Command",77];
flambe.input.Key.Command.toString = $estr;
flambe.input.Key.Command.__enum__ = flambe.input.Key;
flambe.input.Key.Control = ["Control",78];
flambe.input.Key.Control.toString = $estr;
flambe.input.Key.Control.__enum__ = flambe.input.Key;
flambe.input.Key.Delete = ["Delete",79];
flambe.input.Key.Delete.toString = $estr;
flambe.input.Key.Delete.__enum__ = flambe.input.Key;
flambe.input.Key.End = ["End",80];
flambe.input.Key.End.toString = $estr;
flambe.input.Key.End.__enum__ = flambe.input.Key;
flambe.input.Key.Enter = ["Enter",81];
flambe.input.Key.Enter.toString = $estr;
flambe.input.Key.Enter.__enum__ = flambe.input.Key;
flambe.input.Key.Equals = ["Equals",82];
flambe.input.Key.Equals.toString = $estr;
flambe.input.Key.Equals.__enum__ = flambe.input.Key;
flambe.input.Key.Escape = ["Escape",83];
flambe.input.Key.Escape.toString = $estr;
flambe.input.Key.Escape.__enum__ = flambe.input.Key;
flambe.input.Key.Home = ["Home",84];
flambe.input.Key.Home.toString = $estr;
flambe.input.Key.Home.__enum__ = flambe.input.Key;
flambe.input.Key.Insert = ["Insert",85];
flambe.input.Key.Insert.toString = $estr;
flambe.input.Key.Insert.__enum__ = flambe.input.Key;
flambe.input.Key.LeftBracket = ["LeftBracket",86];
flambe.input.Key.LeftBracket.toString = $estr;
flambe.input.Key.LeftBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Minus = ["Minus",87];
flambe.input.Key.Minus.toString = $estr;
flambe.input.Key.Minus.__enum__ = flambe.input.Key;
flambe.input.Key.PageDown = ["PageDown",88];
flambe.input.Key.PageDown.toString = $estr;
flambe.input.Key.PageDown.__enum__ = flambe.input.Key;
flambe.input.Key.PageUp = ["PageUp",89];
flambe.input.Key.PageUp.toString = $estr;
flambe.input.Key.PageUp.__enum__ = flambe.input.Key;
flambe.input.Key.Period = ["Period",90];
flambe.input.Key.Period.toString = $estr;
flambe.input.Key.Period.__enum__ = flambe.input.Key;
flambe.input.Key.Quote = ["Quote",91];
flambe.input.Key.Quote.toString = $estr;
flambe.input.Key.Quote.__enum__ = flambe.input.Key;
flambe.input.Key.RightBracket = ["RightBracket",92];
flambe.input.Key.RightBracket.toString = $estr;
flambe.input.Key.RightBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Semicolon = ["Semicolon",93];
flambe.input.Key.Semicolon.toString = $estr;
flambe.input.Key.Semicolon.__enum__ = flambe.input.Key;
flambe.input.Key.Shift = ["Shift",94];
flambe.input.Key.Shift.toString = $estr;
flambe.input.Key.Shift.__enum__ = flambe.input.Key;
flambe.input.Key.Slash = ["Slash",95];
flambe.input.Key.Slash.toString = $estr;
flambe.input.Key.Slash.__enum__ = flambe.input.Key;
flambe.input.Key.Space = ["Space",96];
flambe.input.Key.Space.toString = $estr;
flambe.input.Key.Space.__enum__ = flambe.input.Key;
flambe.input.Key.Tab = ["Tab",97];
flambe.input.Key.Tab.toString = $estr;
flambe.input.Key.Tab.__enum__ = flambe.input.Key;
flambe.input.Key.Menu = ["Menu",98];
flambe.input.Key.Menu.toString = $estr;
flambe.input.Key.Menu.__enum__ = flambe.input.Key;
flambe.input.Key.Search = ["Search",99];
flambe.input.Key.Search.toString = $estr;
flambe.input.Key.Search.__enum__ = flambe.input.Key;
flambe.input.Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe.input.Key; $x.toString = $estr; return $x; }
flambe.input.KeyboardEvent = function() {
	this.init(0,null);
};
$hxClasses["flambe.input.KeyboardEvent"] = flambe.input.KeyboardEvent;
flambe.input.KeyboardEvent.__name__ = true;
flambe.input.KeyboardEvent.prototype = {
	init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe.input.KeyboardEvent
}
flambe.input.MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : true, __constructs__ : ["Left","Middle","Right","Unknown"] }
flambe.input.MouseButton.Left = ["Left",0];
flambe.input.MouseButton.Left.toString = $estr;
flambe.input.MouseButton.Left.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Middle = ["Middle",1];
flambe.input.MouseButton.Middle.toString = $estr;
flambe.input.MouseButton.Middle.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Right = ["Right",2];
flambe.input.MouseButton.Right.toString = $estr;
flambe.input.MouseButton.Right.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe.input.MouseButton; $x.toString = $estr; return $x; }
flambe.input.MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : true, __constructs__ : ["Default","Button","None"] }
flambe.input.MouseCursor.Default = ["Default",0];
flambe.input.MouseCursor.Default.toString = $estr;
flambe.input.MouseCursor.Default.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.Button = ["Button",1];
flambe.input.MouseCursor.Button.toString = $estr;
flambe.input.MouseCursor.Button.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.None = ["None",2];
flambe.input.MouseCursor.None.toString = $estr;
flambe.input.MouseCursor.None.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe.input.MouseEvent;
flambe.input.MouseEvent.__name__ = true;
flambe.input.MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe.input.MouseEvent
}
flambe.input.EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : true, __constructs__ : ["Mouse","Touch"] }
flambe.input.EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe.input.PointerEvent;
flambe.input.PointerEvent.__name__ = true;
flambe.input.PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe.input.PointerEvent
}
flambe.input.TouchPoint = function(id) {
	this.id = id;
	this._source = flambe.input.EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe.input.TouchPoint;
flambe.input.TouchPoint.__name__ = true;
flambe.input.TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe.input.TouchPoint
}
flambe.math.FMath = function() { }
$hxClasses["flambe.math.FMath"] = flambe.math.FMath;
flambe.math.FMath.__name__ = true;
flambe.math.FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
}
flambe.math.Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe.math.Matrix;
flambe.math.Matrix.__name__ = true;
flambe.math.Matrix.prototype = {
	toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,__class__: flambe.math.Matrix
}
flambe.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe.math.Rectangle;
flambe.math.Rectangle.__name__ = true;
flambe.math.Rectangle.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: flambe.math.Rectangle
}
flambe.platform.BasicAsset = function() {
	this._reloadCount = null;
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe.platform.BasicAsset;
flambe.platform.BasicAsset.__name__ = true;
flambe.platform.BasicAsset.__interfaces__ = [flambe.asset.Asset];
flambe.platform.BasicAsset.prototype = {
	onDisposed: function() {
		flambe.util.Assert.fail();
	}
	,copyFrom: function(asset) {
		flambe.util.Assert.fail();
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,reload: function(asset) {
		this.copyFrom(asset);
		if(this._reloadCount != null) {
			var _g = this._reloadCount;
			_g.set__(_g.get__() + 1);
		}
	}
	,assertNotDisposed: function() {
		flambe.util.Assert.that(!this._disposed,"Asset cannot be used after being disposed");
	}
	,__class__: flambe.platform.BasicAsset
}
flambe.platform.BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe.util.Promise();
	this._bytesLoaded = new haxe.ds.StringMap();
	this._pack = new flambe.platform._BasicAssetPackLoader.BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe.ds.StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = (((function() {
			return function(_e) {
				return (function() {
					return function() {
						return _e.iterator();
					};
				})();
			};
		})())(groups))();
		while( $it0.hasNext() ) {
			var group = $it0.next();
			var group1 = [group];
			this.pickBestEntry(group1[0],(function(group1) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g1 = _g.promise;
						_g1.set_total(_g1.get_total() + bestEntry.bytes);
					} else {
						var badEntry = group1[0][0];
						if(flambe.platform.BasicAssetPackLoader.isAudio(badEntry.format)) {
							flambe.Log.warn("Could not find a supported audio format to load",["name",badEntry.name]);
							_g.handleLoad(badEntry,flambe.platform.DummySound.getInstance());
						} else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group1));
		}
	}
	var catapult = this._platform.getCatapultClient();
	if(catapult != null) catapult.add(this);
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe.platform.BasicAssetPackLoader;
flambe.platform.BasicAssetPackLoader.__name__ = true;
flambe.platform.BasicAssetPackLoader.removeUrlParams = function(url) {
	var query = url.indexOf("?");
	return query > 0?HxOverrides.substr(url,0,query):url;
}
flambe.platform.BasicAssetPackLoader.isAudio = function(format) {
	switch( (format)[1] ) {
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		return true;
	default:
		return false;
	}
}
flambe.platform.BasicAssetPackLoader.prototype = {
	handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,handleError: function(entry,message) {
		flambe.Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
		this.promise.error.emit(flambe.util.Strings.withFields(message,["url",entry.url]));
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._bytesLoaded))();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			map = this._pack.textures;
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		var oldAsset = map.get(entry.name);
		if(oldAsset != null) {
			flambe.Log.info("Reloaded asset",["url",entry.url]);
			oldAsset.reload(asset);
		} else {
			map.set(entry.name,asset);
			this._assetsRemaining -= 1;
			if(this._assetsRemaining == 0) this.handleSuccess();
		}
	}
	,getAssetFormats: function(fn) {
		flambe.util.Assert.fail();
	}
	,loadEntry: function(url,entry) {
		flambe.util.Assert.fail();
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,onDisposed: function() {
		var catapult = this._platform.getCatapultClient();
		if(catapult != null) catapult.remove(this);
	}
	,reload: function(url) {
		var _g = this;
		var baseUrl = flambe.platform.BasicAssetPackLoader.removeUrlParams(url);
		var foundEntry = null;
		var $it0 = this.manifest.iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			if(baseUrl == flambe.platform.BasicAssetPackLoader.removeUrlParams(entry.url)) {
				foundEntry = entry;
				break;
			}
		}
		if(foundEntry != null) this.getAssetFormats(function(formats) {
			if(flambe.util.Arrays.indexOf(formats,foundEntry.format) >= 0) {
				var entry = new flambe.asset.AssetEntry(foundEntry.name,url,foundEntry.format,0);
				_g.loadEntry(_g.manifest.getFullURL(entry),entry);
			}
		});
	}
	,__class__: flambe.platform.BasicAssetPackLoader
}
flambe.platform._BasicAssetPackLoader = {}
flambe.platform._BasicAssetPackLoader.BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.files = new haxe.ds.StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe.platform._BasicAssetPackLoader.BasicAssetPack;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__name__ = true;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [flambe.asset.AssetPack];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe.util.Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe.Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe.util.Strings.removeFileExtension(path) + "\"?");
}
flambe.platform._BasicAssetPackLoader.BasicAssetPack.prototype = {
	assertNotDisposed: function() {
		flambe.util.Assert.that(!this.disposed,"AssetPack cannot be used after being disposed");
	}
	,dispose: function() {
		if(!this.disposed) {
			this.disposed = true;
			var $it0 = ((function(_e) {
				return function() {
					return _e.iterator();
				};
			})(this.textures))();
			while( $it0.hasNext() ) {
				var texture = $it0.next();
				texture.dispose();
			}
			this.textures = null;
			var $it1 = ((function(_e1) {
				return function() {
					return _e1.iterator();
				};
			})(this.sounds))();
			while( $it1.hasNext() ) {
				var sound = $it1.next();
				sound.dispose();
			}
			this.sounds = null;
			var $it2 = ((function(_e2) {
				return function() {
					return _e2.iterator();
				};
			})(this.files))();
			while( $it2.hasNext() ) {
				var file = $it2.next();
				file.dispose();
			}
			this.files = null;
			this.loader.onDisposed();
		}
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		var file = this.files.get(name);
		if(file == null && required) throw flambe.util.Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,getTexture: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe.util.Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,__class__: flambe.platform._BasicAssetPackLoader.BasicAssetPack
}
flambe.platform.BasicFile = function(content) {
	flambe.platform.BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe.platform.BasicFile;
flambe.platform.BasicFile.__name__ = true;
flambe.platform.BasicFile.__interfaces__ = [flambe.asset.File];
flambe.platform.BasicFile.__super__ = flambe.platform.BasicAsset;
flambe.platform.BasicFile.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this._content = null;
	}
	,copyFrom: function(that) {
		this._content = that._content;
	}
	,toString: function() {
		this.assertNotDisposed();
		return this._content;
	}
	,__class__: flambe.platform.BasicFile
});
flambe.subsystem = {}
flambe.subsystem.KeyboardSystem = function() { }
$hxClasses["flambe.subsystem.KeyboardSystem"] = flambe.subsystem.KeyboardSystem;
flambe.subsystem.KeyboardSystem.__name__ = true;
flambe.subsystem.KeyboardSystem.prototype = {
	__class__: flambe.subsystem.KeyboardSystem
}
flambe.platform.BasicKeyboard = function() {
	this.down = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.backButton = new flambe.util.Signal0();
	this._keyStates = new haxe.ds.IntMap();
};
$hxClasses["flambe.platform.BasicKeyboard"] = flambe.platform.BasicKeyboard;
flambe.platform.BasicKeyboard.__name__ = true;
flambe.platform.BasicKeyboard.__interfaces__ = [flambe.subsystem.KeyboardSystem];
flambe.platform.BasicKeyboard.prototype = {
	submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe.platform.BasicKeyboard._sharedEvent.init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.up.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe.platform.BasicKeyboard._sharedEvent.init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.down.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,isDown: function(key) {
		return this.isCodeDown(flambe.platform.KeyCodes.toKeyCode(key));
	}
	,__class__: flambe.platform.BasicKeyboard
}
flambe.subsystem.MouseSystem = function() { }
$hxClasses["flambe.subsystem.MouseSystem"] = flambe.subsystem.MouseSystem;
flambe.subsystem.MouseSystem.__name__ = true;
flambe.platform.BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe.input.EventSource.Mouse(flambe.platform.BasicMouse._sharedEvent);
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.scroll = new flambe.util.Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe.input.MouseCursor.Default;
	this._buttonStates = new haxe.ds.IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe.platform.BasicMouse;
flambe.platform.BasicMouse.__name__ = true;
flambe.platform.BasicMouse.__interfaces__ = [flambe.subsystem.MouseSystem];
flambe.platform.BasicMouse.prototype = {
	prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicMouse._sharedEvent.init(flambe.platform.BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe.platform.BasicMouse._sharedEvent);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this.isCodeDown(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,__class__: flambe.platform.BasicMouse
}
flambe.subsystem.PointerSystem = function() { }
$hxClasses["flambe.subsystem.PointerSystem"] = flambe.subsystem.PointerSystem;
flambe.subsystem.PointerSystem.__name__ = true;
flambe.subsystem.PointerSystem.prototype = {
	__class__: flambe.subsystem.PointerSystem
}
flambe.platform.BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe.platform.BasicPointer;
flambe.platform.BasicPointer.__name__ = true;
flambe.platform.BasicPointer.__interfaces__ = [flambe.subsystem.PointerSystem];
flambe.platform.BasicPointer.prototype = {
	prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicPointer._sharedEvent.init(flambe.platform.BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this._isDown = false;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_2");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerUp;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.up.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_2");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerMove;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.move.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this._isDown = true;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_2");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerDown;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.down.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,__class__: flambe.platform.BasicPointer
}
flambe.subsystem.TouchSystem = function() { }
$hxClasses["flambe.subsystem.TouchSystem"] = flambe.subsystem.TouchSystem;
flambe.subsystem.TouchSystem.__name__ = true;
flambe.platform.BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe.ds.IntMap();
	this._points = [];
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe.platform.BasicTouch;
flambe.platform.BasicTouch.__name__ = true;
flambe.platform.BasicTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.BasicTouch.prototype = {
	submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe.input.TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,__class__: flambe.platform.BasicTouch
}
flambe.platform.CatapultClient = function() {
	this._loaders = [];
};
$hxClasses["flambe.platform.CatapultClient"] = flambe.platform.CatapultClient;
flambe.platform.CatapultClient.__name__ = true;
flambe.platform.CatapultClient.prototype = {
	onRestart: function() {
		flambe.util.Assert.fail();
	}
	,onMessage: function(message) {
		var message1 = haxe.Json.parse(message);
		switch(message1.type) {
		case "file_changed":
			var url = message1.name + "?v=" + message1.md5;
			url = StringTools.replace(url,"\\","/");
			var _g = 0, _g1 = this._loaders;
			while(_g < _g1.length) {
				var loader = _g1[_g];
				++_g;
				loader.reload(url);
			}
			break;
		case "restart":
			this.onRestart();
			break;
		}
	}
	,onError: function(cause) {
		flambe.Log.warn("Unable to connect to Catapult",["cause",cause]);
	}
	,remove: function(loader) {
		HxOverrides.remove(this._loaders,loader);
	}
	,add: function(loader) {
		if(loader.manifest.get_relativeBasePath() == "assets") this._loaders.push(loader);
	}
	,__class__: flambe.platform.CatapultClient
}
flambe.platform.DebugLogic = function(platform) {
	var _g = this;
	this._platform = platform;
	platform.getKeyboard().down.connect(function(event) {
		if(event.key == flambe.input.Key.O && platform.getKeyboard().isDown(flambe.input.Key.Control)) {
			if(_g.toggleOverdrawGraphics()) flambe.Log.info("Enabled overdraw visualizer, press Ctrl-O again to disable");
		}
	});
};
$hxClasses["flambe.platform.DebugLogic"] = flambe.platform.DebugLogic;
flambe.platform.DebugLogic.__name__ = true;
flambe.platform.DebugLogic.prototype = {
	toggleOverdrawGraphics: function() {
		var renderer = this._platform.getRenderer();
		if(this._savedGraphics != null) {
			renderer.graphics = this._savedGraphics;
			this._savedGraphics = null;
		} else if(renderer.graphics != null) {
			this._savedGraphics = renderer.graphics;
			renderer.graphics = new flambe.platform.OverdrawGraphics(this._savedGraphics);
			return true;
		}
		return false;
	}
	,__class__: flambe.platform.DebugLogic
}
flambe.sound = {}
flambe.sound.Sound = function() { }
$hxClasses["flambe.sound.Sound"] = flambe.sound.Sound;
flambe.sound.Sound.__name__ = true;
flambe.sound.Sound.__interfaces__ = [flambe.asset.Asset];
flambe.platform.DummySound = function() {
	flambe.platform.BasicAsset.call(this);
	this._playback = new flambe.platform.DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe.platform.DummySound;
flambe.platform.DummySound.__name__ = true;
flambe.platform.DummySound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.DummySound.getInstance = function() {
	if(flambe.platform.DummySound._instance == null) flambe.platform.DummySound._instance = new flambe.platform.DummySound();
	return flambe.platform.DummySound._instance;
}
flambe.platform.DummySound.__super__ = flambe.platform.BasicAsset;
flambe.platform.DummySound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	__class__: flambe.platform.DummySound
});
flambe.sound.Playback = function() { }
$hxClasses["flambe.sound.Playback"] = flambe.sound.Playback;
flambe.sound.Playback.__name__ = true;
flambe.sound.Playback.__interfaces__ = [flambe.util.Disposable];
flambe.platform.DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe.animation.AnimatedFloat(0);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe.platform.DummyPlayback;
flambe.platform.DummyPlayback.__name__ = true;
flambe.platform.DummyPlayback.__interfaces__ = [flambe.sound.Playback];
flambe.platform.DummyPlayback.prototype = {
	dispose: function() {
	}
	,__class__: flambe.platform.DummyPlayback
}
flambe.platform.DummyTouch = function() {
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe.platform.DummyTouch;
flambe.platform.DummyTouch.__name__ = true;
flambe.platform.DummyTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.DummyTouch.prototype = {
	__class__: flambe.platform.DummyTouch
}
flambe.platform.EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe.platform.EventGroup;
flambe.platform.EventGroup.__name__ = true;
flambe.platform.EventGroup.__interfaces__ = [flambe.util.Disposable];
flambe.platform.EventGroup.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe.platform._EventGroup.Entry(dispatcher,type,listener));
	}
	,__class__: flambe.platform.EventGroup
}
flambe.platform._EventGroup = {}
flambe.platform._EventGroup.Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe.platform._EventGroup.Entry;
flambe.platform._EventGroup.Entry.__name__ = true;
flambe.platform._EventGroup.Entry.prototype = {
	__class__: flambe.platform._EventGroup.Entry
}
flambe.platform.InternalGraphics = function() { }
$hxClasses["flambe.platform.InternalGraphics"] = flambe.platform.InternalGraphics;
flambe.platform.InternalGraphics.__name__ = true;
flambe.platform.InternalGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.InternalGraphics.prototype = {
	__class__: flambe.platform.InternalGraphics
}
flambe.platform.KeyCodes = function() { }
$hxClasses["flambe.platform.KeyCodes"] = flambe.platform.KeyCodes;
flambe.platform.KeyCodes.__name__ = true;
flambe.platform.KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe.input.Key.A;
	case 66:
		return flambe.input.Key.B;
	case 67:
		return flambe.input.Key.C;
	case 68:
		return flambe.input.Key.D;
	case 69:
		return flambe.input.Key.E;
	case 70:
		return flambe.input.Key.F;
	case 71:
		return flambe.input.Key.G;
	case 72:
		return flambe.input.Key.H;
	case 73:
		return flambe.input.Key.I;
	case 74:
		return flambe.input.Key.J;
	case 75:
		return flambe.input.Key.K;
	case 76:
		return flambe.input.Key.L;
	case 77:
		return flambe.input.Key.M;
	case 78:
		return flambe.input.Key.N;
	case 79:
		return flambe.input.Key.O;
	case 80:
		return flambe.input.Key.P;
	case 81:
		return flambe.input.Key.Q;
	case 82:
		return flambe.input.Key.R;
	case 83:
		return flambe.input.Key.S;
	case 84:
		return flambe.input.Key.T;
	case 85:
		return flambe.input.Key.U;
	case 86:
		return flambe.input.Key.V;
	case 87:
		return flambe.input.Key.W;
	case 88:
		return flambe.input.Key.X;
	case 89:
		return flambe.input.Key.Y;
	case 90:
		return flambe.input.Key.Z;
	case 48:
		return flambe.input.Key.Number0;
	case 49:
		return flambe.input.Key.Number1;
	case 50:
		return flambe.input.Key.Number2;
	case 51:
		return flambe.input.Key.Number3;
	case 52:
		return flambe.input.Key.Number4;
	case 53:
		return flambe.input.Key.Number5;
	case 54:
		return flambe.input.Key.Number6;
	case 55:
		return flambe.input.Key.Number7;
	case 56:
		return flambe.input.Key.Number8;
	case 57:
		return flambe.input.Key.Number9;
	case 96:
		return flambe.input.Key.Numpad0;
	case 97:
		return flambe.input.Key.Numpad1;
	case 98:
		return flambe.input.Key.Numpad2;
	case 99:
		return flambe.input.Key.Numpad3;
	case 100:
		return flambe.input.Key.Numpad4;
	case 101:
		return flambe.input.Key.Numpad5;
	case 102:
		return flambe.input.Key.Numpad6;
	case 103:
		return flambe.input.Key.Numpad7;
	case 104:
		return flambe.input.Key.Numpad8;
	case 105:
		return flambe.input.Key.Numpad9;
	case 107:
		return flambe.input.Key.NumpadAdd;
	case 110:
		return flambe.input.Key.NumpadDecimal;
	case 111:
		return flambe.input.Key.NumpadDivide;
	case 108:
		return flambe.input.Key.NumpadEnter;
	case 106:
		return flambe.input.Key.NumpadMultiply;
	case 109:
		return flambe.input.Key.NumpadSubtract;
	case 112:
		return flambe.input.Key.F1;
	case 113:
		return flambe.input.Key.F2;
	case 114:
		return flambe.input.Key.F3;
	case 115:
		return flambe.input.Key.F4;
	case 116:
		return flambe.input.Key.F5;
	case 117:
		return flambe.input.Key.F6;
	case 118:
		return flambe.input.Key.F7;
	case 119:
		return flambe.input.Key.F8;
	case 120:
		return flambe.input.Key.F9;
	case 121:
		return flambe.input.Key.F10;
	case 122:
		return flambe.input.Key.F11;
	case 123:
		return flambe.input.Key.F12;
	case 37:
		return flambe.input.Key.Left;
	case 38:
		return flambe.input.Key.Up;
	case 39:
		return flambe.input.Key.Right;
	case 40:
		return flambe.input.Key.Down;
	case 18:
		return flambe.input.Key.Alt;
	case 192:
		return flambe.input.Key.Backquote;
	case 220:
		return flambe.input.Key.Backslash;
	case 8:
		return flambe.input.Key.Backspace;
	case 20:
		return flambe.input.Key.CapsLock;
	case 188:
		return flambe.input.Key.Comma;
	case 15:
		return flambe.input.Key.Command;
	case 17:
		return flambe.input.Key.Control;
	case 46:
		return flambe.input.Key.Delete;
	case 35:
		return flambe.input.Key.End;
	case 13:
		return flambe.input.Key.Enter;
	case 187:
		return flambe.input.Key.Equals;
	case 27:
		return flambe.input.Key.Escape;
	case 36:
		return flambe.input.Key.Home;
	case 45:
		return flambe.input.Key.Insert;
	case 219:
		return flambe.input.Key.LeftBracket;
	case 189:
		return flambe.input.Key.Minus;
	case 34:
		return flambe.input.Key.PageDown;
	case 33:
		return flambe.input.Key.PageUp;
	case 190:
		return flambe.input.Key.Period;
	case 222:
		return flambe.input.Key.Quote;
	case 221:
		return flambe.input.Key.RightBracket;
	case 186:
		return flambe.input.Key.Semicolon;
	case 16:
		return flambe.input.Key.Shift;
	case 191:
		return flambe.input.Key.Slash;
	case 32:
		return flambe.input.Key.Space;
	case 9:
		return flambe.input.Key.Tab;
	case 16777234:
		return flambe.input.Key.Menu;
	case 16777247:
		return flambe.input.Key.Search;
	}
	return flambe.input.Key.Unknown(keyCode);
}
flambe.platform.KeyCodes.toKeyCode = function(key) {
	var $e = (key);
	switch( $e[1] ) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = $e[2];
		return keyCode;
	}
}
flambe.platform.MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe.platform.MainLoop;
flambe.platform.MainLoop.__name__ = true;
flambe.platform.MainLoop.updateEntity = function(entity,dt) {
	var speed = entity.getComponent("SpeedAdjuster_1");
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale.get__();
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next = p1.next;
		flambe.platform.MainLoop.updateEntity(p1,dt);
		p1 = next;
	}
}
flambe.platform.MainLoop.prototype = {
	render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe.display.Sprite.render(flambe.System.root,graphics);
			renderer.didRender();
		}
	}
	,update: function(dt) {
		if(dt <= 0) {
			flambe.Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe.System.volume.update(dt);
		flambe.platform.MainLoop.updateEntity(flambe.System.root,dt);
	}
	,__class__: flambe.platform.MainLoop
}
flambe.platform.MouseCodes = function() { }
$hxClasses["flambe.platform.MouseCodes"] = flambe.platform.MouseCodes;
flambe.platform.MouseCodes.__name__ = true;
flambe.platform.MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe.input.MouseButton.Left;
	case 1:
		return flambe.input.MouseButton.Middle;
	case 2:
		return flambe.input.MouseButton.Right;
	}
	return flambe.input.MouseButton.Unknown(buttonCode);
}
flambe.platform.OverdrawGraphics = function(impl) {
	this._impl = impl;
};
$hxClasses["flambe.platform.OverdrawGraphics"] = flambe.platform.OverdrawGraphics;
flambe.platform.OverdrawGraphics.__name__ = true;
flambe.platform.OverdrawGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.OverdrawGraphics.prototype = {
	drawRegion: function(x,y,width,height) {
		this._impl.fillRect(1052680,x,y,width,height);
	}
	,didRender: function() {
		this._impl.restore();
		this._impl.didRender();
	}
	,willRender: function() {
		this._impl.willRender();
		this._impl.save();
		this._impl.setBlendMode(flambe.display.BlendMode.Add);
	}
	,fillRect: function(color,x,y,width,height) {
		this.drawRegion(x,y,width,height);
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		this.drawRegion(destX,destY,sourceW,sourceH);
	}
	,drawImage: function(texture,destX,destY) {
		this.drawRegion(destX,destY,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		this._impl.restore();
	}
	,applyScissor: function(x,y,width,height) {
		this._impl.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
	}
	,multiplyAlpha: function(factor) {
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._impl.transform(m00,m10,m01,m11,m02,m12);
	}
	,rotate: function(rotation) {
		this._impl.rotate(rotation);
	}
	,translate: function(x,y) {
		this._impl.translate(x,y);
	}
	,arc: function(x,y,radius,startAngle,endAngle,anticlockwise) {
	}
	,stroke: function() {
	}
	,closePath: function() {
	}
	,beginPath: function() {
	}
	,lineTo: function(x,y) {
	}
	,moveTo: function(x,y) {
	}
	,clear: function(rect) {
	}
	,save: function() {
		this._impl.save();
	}
	,__class__: flambe.platform.OverdrawGraphics
}
flambe.platform.Renderer = function() { }
$hxClasses["flambe.platform.Renderer"] = flambe.platform.Renderer;
flambe.platform.Renderer.__name__ = true;
flambe.platform.Renderer.prototype = {
	__class__: flambe.platform.Renderer
}
flambe.platform.Tickable = function() { }
$hxClasses["flambe.platform.Tickable"] = flambe.platform.Tickable;
flambe.platform.Tickable.__name__ = true;
flambe.platform.Tickable.prototype = {
	__class__: flambe.platform.Tickable
}
flambe.platform.html.CanvasGraphics = function(canvas) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d");
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe.platform.html.CanvasGraphics;
flambe.platform.html.CanvasGraphics.__name__ = true;
flambe.platform.html.CanvasGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.CanvasGraphics.prototype = {
	arc: function(x,y,radius,startAngle,endAngle,anticlockwise) {
		this._canvasCtx.arc(x,y,radius,startAngle,endAngle,anticlockwise);
	}
	,stroke: function() {
		this._canvasCtx.stroke();
	}
	,closePath: function() {
		this._canvasCtx.closePath();
	}
	,beginPath: function() {
		this._canvasCtx.beginPath();
	}
	,lineTo: function(x,y) {
		this._canvasCtx.lineTo(x,y);
	}
	,moveTo: function(x,y) {
		this._canvasCtx.moveTo(x,y);
	}
	,clear: function(rect) {
		this._canvasCtx.clearRect(rect.x,rect.y,rect.width,rect.height);
	}
	,didRender: function() {
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
		this._canvasCtx.clip();
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch( (blendMode)[1] ) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "destination-in";
			break;
		case 3:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubImage(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		texture1.assertNotDisposed();
		this._canvasCtx.drawImage(texture1.image,Std["int"](sourceX),Std["int"](sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
	}
	,drawImage: function(texture,x,y) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawImage(texture,x,y);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		texture1.assertNotDisposed();
		this._canvasCtx.drawImage(texture1.image,Std["int"](x),Std["int"](y));
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,rotate: function(rotation) {
		this._canvasCtx.rotate(flambe.math.FMath.toRadians(rotation));
	}
	,translate: function(x,y) {
		this._canvasCtx.translate(x,y);
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,__class__: flambe.platform.html.CanvasGraphics
}
flambe.platform.html.CanvasRenderer = function(canvas) {
	this.graphics = new flambe.platform.html.CanvasGraphics(canvas);
	flambe.System.hasGPU.set__(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe.platform.html.CanvasRenderer;
flambe.platform.html.CanvasRenderer.__name__ = true;
flambe.platform.html.CanvasRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.CanvasRenderer.prototype = {
	getName: function() {
		return "Canvas";
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		flambe.util.Assert.fail();
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createEmptyTexture: function(width,height) {
		return new flambe.platform.html.CanvasTexture(flambe.platform.html.HtmlUtil.createEmptyCanvas(width,height));
	}
	,createTexture: function(image) {
		return new flambe.platform.html.CanvasTexture(flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES?flambe.platform.html.HtmlUtil.createCanvas(image):image);
	}
	,__class__: flambe.platform.html.CanvasRenderer
}
flambe.platform.html.CanvasTexture = function(image) {
	this._graphics = null;
	this.pattern = null;
	flambe.platform.BasicAsset.call(this);
	this.image = image;
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe.platform.html.CanvasTexture;
flambe.platform.html.CanvasTexture.__name__ = true;
flambe.platform.html.CanvasTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.CanvasTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.CanvasTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.image = null;
		this.pattern = null;
		this._graphics = null;
	}
	,copyFrom: function(that) {
		this.image = that.image;
		this.pattern = that.pattern;
		this._graphics = that._graphics;
	}
	,getContext2d: function() {
		if(!Std["is"](this.image,HTMLCanvasElement)) this.image = flambe.platform.html.HtmlUtil.createCanvas(this.image);
		var canvas = this.image;
		return canvas.getContext("2d");
	}
	,get_graphics: function() {
		this.assertNotDisposed();
		if(this._graphics == null) {
			this.getContext2d();
			this._graphics = new flambe.platform.html._CanvasTexture.InternalGraphics(this);
		}
		return this._graphics;
	}
	,get_height: function() {
		this.assertNotDisposed();
		return this.image.height;
	}
	,get_width: function() {
		this.assertNotDisposed();
		return this.image.width;
	}
	,dirtyContents: function() {
		this.pattern = null;
	}
	,__class__: flambe.platform.html.CanvasTexture
});
flambe.platform.html._CanvasTexture = {}
flambe.platform.html._CanvasTexture.InternalGraphics = function(renderTarget) {
	flambe.platform.html.CanvasGraphics.call(this,renderTarget.image);
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html._CanvasTexture.InternalGraphics"] = flambe.platform.html._CanvasTexture.InternalGraphics;
flambe.platform.html._CanvasTexture.InternalGraphics.__name__ = true;
flambe.platform.html._CanvasTexture.InternalGraphics.__super__ = flambe.platform.html.CanvasGraphics;
flambe.platform.html._CanvasTexture.InternalGraphics.prototype = $extend(flambe.platform.html.CanvasGraphics.prototype,{
	arc: function(x,y,radius,startAngle,endAngle,anticlockwise) {
		flambe.platform.html.CanvasGraphics.prototype.arc.call(this,x,y,radius,startAngle,endAngle,anticlockwise);
	}
	,closePath: function() {
		flambe.platform.html.CanvasGraphics.prototype.closePath.call(this);
	}
	,beginPath: function() {
		flambe.platform.html.CanvasGraphics.prototype.beginPath.call(this);
	}
	,stroke: function() {
		flambe.platform.html.CanvasGraphics.prototype.stroke.call(this);
		this._renderTarget.dirtyContents();
	}
	,lineTo: function(x,y) {
		flambe.platform.html.CanvasGraphics.prototype.lineTo.call(this,x,y);
	}
	,moveTo: function(x,y) {
		flambe.platform.html.CanvasGraphics.prototype.moveTo.call(this,x,y);
	}
	,clear: function(rect) {
		flambe.platform.html.CanvasGraphics.prototype.clear.call(this,rect);
		this._renderTarget.dirtyContents();
	}
	,fillRect: function(color,x,y,width,height) {
		flambe.platform.html.CanvasGraphics.prototype.fillRect.call(this,color,x,y,width,height);
		this._renderTarget.dirtyContents();
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		flambe.platform.html.CanvasGraphics.prototype.drawSubImage.call(this,texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
		this._renderTarget.dirtyContents();
	}
	,drawImage: function(texture,x,y) {
		flambe.platform.html.CanvasGraphics.prototype.drawImage.call(this,texture,x,y);
		this._renderTarget.dirtyContents();
	}
	,__class__: flambe.platform.html._CanvasTexture.InternalGraphics
});
flambe.platform.html.HtmlAssetPackLoader = function(platform,manifest) {
	flambe.platform.BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe.platform.html.HtmlAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.__name__ = true;
flambe.platform.html.HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe.asset.AssetFormat.PNG,flambe.asset.AssetFormat.JPG,flambe.asset.AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp = js.Browser.document.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe.asset.AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr = js.Browser.document.createElement("img");
	jxr.onload = jxr.onerror = function(_) {
		if(jxr.width == 1) formats.unshift(flambe.asset.AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
}
flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio = js.Browser.document.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		flambe.Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android)\\b","");
	var userAgent = js.Browser.window.navigator.userAgent;
	if(!flambe.platform.html.WebAudioSound.get_supported() && blacklist.match(userAgent)) {
		flambe.Log.warn("HTML5 audio is blacklisted for this browser",["userAgent",userAgent]);
		return [];
	}
	var types = [{ format : flambe.asset.AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe.asset.AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe.asset.AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe.asset.AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe.asset.AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
}
flambe.platform.html.HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport) {
		flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe.platform.html.HtmlAssetPackLoader._URL = flambe.platform.html.HtmlUtil.loadExtension("URL").value;
	}
	return flambe.platform.html.HtmlAssetPackLoader._URL != null && flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL != null;
}
flambe.platform.html.HtmlAssetPackLoader.__super__ = flambe.platform.BasicAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.prototype = $extend(flambe.platform.BasicAssetPackLoader.prototype,{
	download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = new XMLHttpRequest();
		var lastActivity = 0.0;
		var start = function() {
			lastActivity = flambe.platform.html.HtmlUtil.now();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			if(xhr.responseType == "") xhr.responseType = "arraybuffer";
			xhr.send();
		};
		var interval = 0;
		if(typeof(xhr.onprogress) != "undefined") {
			var attempts = 4;
			xhr.onprogress = function(event) {
				lastActivity = flambe.platform.html.HtmlUtil.now();
				_g.handleProgress(entry,event.loaded);
			};
			interval = js.Browser.window.setInterval(function() {
				if(xhr.readyState >= 1 && flambe.platform.html.HtmlUtil.now() - lastActivity > 5000) {
					xhr.abort();
					--attempts;
					if(attempts > 0) {
						flambe.Log.warn("Retrying stalled asset request",["url",entry.url]);
						start();
					} else {
						js.Browser.window.clearInterval(interval);
						_g.handleError(entry,"Request timed out");
					}
				}
			},1000);
		}
		xhr.onload = function(_) {
			js.Browser.window.clearInterval(interval);
			var response = xhr.response;
			if(response == null) response = xhr.responseText; else if(responseType == "blob" && xhr.responseType == "arraybuffer") response = new Blob([xhr.response]);
			onLoad(response);
		};
		xhr.onerror = function(_) {
			js.Browser.window.clearInterval(interval);
			_g.handleError(entry,"Failed to load asset: error #" + xhr.status);
		};
		start();
		return xhr;
	}
	,downloadText: function(url,entry,onLoad) {
		this.download(url,entry,"text",onLoad);
	}
	,downloadBlob: function(url,entry,onLoad) {
		this.download(url,entry,"blob",onLoad);
	}
	,downloadArrayBuffer: function(url,entry,onLoad) {
		this.download(url,entry,"arraybuffer",onLoad);
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe.platform.html.HtmlAssetPackLoader._supportedFormats == null) {
			flambe.platform.html.HtmlAssetPackLoader._supportedFormats = new flambe.util.Promise();
			flambe.platform.html.HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe.platform.html.HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats()).concat([flambe.asset.AssetFormat.Data]));
			});
		}
		flambe.platform.html.HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,loadEntry: function(url,entry) {
		var _g = this;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			var image = js.Browser.document.createElement("img");
			var events = new flambe.platform.EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe.Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) flambe.platform.html.HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g._platform.getRenderer().createTexture(image);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_) {
				_g.handleError(entry,"Failed to load image");
			});
			if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) this.downloadBlob(url,entry,function(blob) {
				image.src = flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:
		case 6:
		case 7:
			this.downloadArrayBuffer(url,entry,function(buffer) {
				var texture = _g._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			if(flambe.platform.html.WebAudioSound.get_supported()) this.downloadArrayBuffer(url,entry,function(buffer) {
				flambe.platform.html.WebAudioSound.ctx.decodeAudioData(buffer,function(decoded) {
					_g.handleLoad(entry,new flambe.platform.html.WebAudioSound(decoded));
				},function() {
					flambe.Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
				});
			}); else {
				var audio = js.Browser.document.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe.platform.html.HtmlAssetPackLoader._mediaRefCount;
				if(flambe.platform.html.HtmlAssetPackLoader._mediaElements == null) flambe.platform.html.HtmlAssetPackLoader._mediaElements = new haxe.ds.IntMap();
				flambe.platform.html.HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events = new flambe.platform.EventGroup();
				events.addDisposingListener(audio,"canplaythrough",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					_g.handleLoad(entry,new flambe.platform.html.HtmlSound(audio));
				});
				events.addDisposingListener(audio,"error",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) {
						flambe.Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
					} else _g.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events.addListener(audio,"progress",function(_) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.downloadText(url,entry,function(text) {
				_g.handleLoad(entry,new flambe.platform.BasicFile(text));
			});
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlAssetPackLoader
});
flambe.platform.html.HtmlCatapultClient = function() {
	var _g = this;
	flambe.platform.CatapultClient.call(this);
	this._socket = new WebSocket("ws://" + js.Browser.location.host);
	this._socket.onerror = function(event) {
		_g.onError("unknown");
	};
	this._socket.onopen = function(event) {
		flambe.Log.info("Catapult connected");
	};
	this._socket.onmessage = function(event) {
		_g.onMessage(event.data);
	};
};
$hxClasses["flambe.platform.html.HtmlCatapultClient"] = flambe.platform.html.HtmlCatapultClient;
flambe.platform.html.HtmlCatapultClient.__name__ = true;
flambe.platform.html.HtmlCatapultClient.canUse = function() {
	return Reflect.hasField(js.Browser.window,"WebSocket");
}
flambe.platform.html.HtmlCatapultClient.__super__ = flambe.platform.CatapultClient;
flambe.platform.html.HtmlCatapultClient.prototype = $extend(flambe.platform.CatapultClient.prototype,{
	onRestart: function() {
		js.Browser.window.top.location.reload();
	}
	,__class__: flambe.platform.html.HtmlCatapultClient
});
flambe.util.LogHandler = function() { }
$hxClasses["flambe.util.LogHandler"] = flambe.util.LogHandler;
flambe.util.LogHandler.__name__ = true;
flambe.util.LogHandler.prototype = {
	__class__: flambe.util.LogHandler
}
flambe.platform.html.HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
$hxClasses["flambe.platform.html.HtmlLogHandler"] = flambe.platform.html.HtmlLogHandler;
flambe.platform.html.HtmlLogHandler.__name__ = true;
flambe.platform.html.HtmlLogHandler.__interfaces__ = [flambe.util.LogHandler];
flambe.platform.html.HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
}
flambe.platform.html.HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch( (level)[1] ) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlLogHandler
}
flambe.platform.html.HtmlMouse = function(pointer,canvas) {
	flambe.platform.BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe.platform.html.HtmlMouse;
flambe.platform.html.HtmlMouse.__name__ = true;
flambe.platform.html.HtmlMouse.__super__ = flambe.platform.BasicMouse;
flambe.platform.html.HtmlMouse.prototype = $extend(flambe.platform.BasicMouse.prototype,{
	__class__: flambe.platform.html.HtmlMouse
});
flambe.platform.html.HtmlSound = function(audioElement) {
	flambe.platform.BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe.platform.html.HtmlSound;
flambe.platform.html.HtmlSound.__name__ = true;
flambe.platform.html.HtmlSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.HtmlSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.HtmlSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.audioElement = null;
	}
	,copyFrom: function(that) {
		this.audioElement = that.audioElement;
	}
	,__class__: flambe.platform.html.HtmlSound
});
flambe.subsystem.StageSystem = function() { }
$hxClasses["flambe.subsystem.StageSystem"] = flambe.subsystem.StageSystem;
flambe.subsystem.StageSystem.__name__ = true;
flambe.subsystem.StageSystem.prototype = {
	__class__: flambe.subsystem.StageSystem
}
flambe.platform.html.HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe.util.Signal0();
	this.scaleFactor = flambe.platform.html.HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe.Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js.Browser.window.addEventListener("orientationchange",function(_) {
			flambe.platform.html.HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js.Browser.window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe.util.Value(null);
	if(js.Browser.window.orientation != null) {
		js.Browser.window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe.util.Value(false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenchange",function(_) {
		_g.updateFullscreen();
	},false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenerror",function(_) {
		flambe.Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe.platform.html.HtmlStage;
flambe.platform.html.HtmlStage.__name__ = true;
flambe.platform.html.HtmlStage.__interfaces__ = [flambe.subsystem.StageSystem];
flambe.platform.html.HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js.Browser.window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe.platform.html.HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js.Browser.window.screen.width;
	var screenHeight = js.Browser.window.screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return 1;
}
flambe.platform.html.HtmlStage.prototype = {
	updateFullscreen: function() {
		var state = flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js.Browser.document).value;
		this.fullscreen.set__(state == true);
	}
	,onOrientationChange: function(_) {
		var value = flambe.platform.html.HtmlUtil.orientation(js.Browser.window.orientation);
		this.orientation.set__(value);
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js.Browser.document.documentElement.style;
		htmlStyle.height = js.Browser.window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js.Browser.window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe.platform.html.HtmlUtil.callLater(function() {
			flambe.platform.html.HtmlUtil.hideMobileBrowser();
			flambe.platform.html.HtmlUtil.callLater(function() {
				htmlStyle.height = js.Browser.window.innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = Std["int"](scaledWidth);
		this._canvas.height = Std["int"](scaledHeight);
		this.resize.emit();
		return true;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,__class__: flambe.platform.html.HtmlStage
}
flambe.platform.html.HtmlUtil = function() { }
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe.platform.html.HtmlUtil;
flambe.platform.html.HtmlUtil.__name__ = true;
flambe.platform.html.HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js.Browser.window.setTimeout(func,delay);
}
flambe.platform.html.HtmlUtil.hideMobileBrowser = function() {
	js.Browser.window.scrollTo(1,0);
}
flambe.platform.html.HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe.platform.html.HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var value = flambe.platform.html.HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
	return true;
}
flambe.platform.html.HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
}
flambe.platform.html.HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
}
flambe.platform.html.HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe.display.Orientation.Landscape;
	default:
		return flambe.display.Orientation.Portrait;
	}
}
flambe.platform.html.HtmlUtil.now = function() {
	return Date.now();
}
flambe.platform.html.HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
}
flambe.platform.html.HtmlUtil.createCanvas = function(source) {
	var canvas = flambe.platform.html.HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
}
flambe.platform.html.HtmlUtil.fixAndroidMath = function() {
	if(js.Browser.navigator.userAgent.indexOf("Linux; U; Android 4") >= 0) {
		flambe.Log.warn("Monkey patching around Android sin/cos bug");
		var sin = Math.sin, cos = Math.cos;
		Math.sin = function(x) {
			return x == 0?0:sin(x);
		};
		Math.cos = function(x) {
			return x == 0?1:cos(x);
		};
	}
}
flambe.platform.html.WebAudioSound = function(buffer) {
	flambe.platform.BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe.platform.html.WebAudioSound;
flambe.platform.html.WebAudioSound.__name__ = true;
flambe.platform.html.WebAudioSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.WebAudioSound.get_supported = function() {
	if(flambe.platform.html.WebAudioSound._detectSupport) {
		flambe.platform.html.WebAudioSound._detectSupport = false;
		var AudioContext = flambe.platform.html.HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe.platform.html.WebAudioSound.ctx = new AudioContext();
			flambe.platform.html.WebAudioSound.gain = flambe.platform.html.WebAudioSound.createGain();
			flambe.platform.html.WebAudioSound.gain.connect(flambe.platform.html.WebAudioSound.ctx.destination);
			flambe.System.volume.watch(function(volume,_) {
				flambe.platform.html.WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe.platform.html.WebAudioSound.ctx != null;
}
flambe.platform.html.WebAudioSound.createGain = function() {
	return flambe.platform.html.WebAudioSound.ctx.createGain != null?flambe.platform.html.WebAudioSound.ctx.createGain():flambe.platform.html.WebAudioSound.ctx.createGainNode();
}
flambe.platform.html.WebAudioSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebAudioSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.buffer = null;
	}
	,copyFrom: function(that) {
		this.buffer = that.buffer;
	}
	,__class__: flambe.platform.html.WebAudioSound
});
flambe.scene = {}
flambe.scene.Director = function() {
	this._transitor = null;
};
$hxClasses["flambe.scene.Director"] = flambe.scene.Director;
flambe.scene.Director.__name__ = true;
flambe.scene.Director.__super__ = flambe.Component;
flambe.scene.Director.prototype = $extend(flambe.Component.prototype,{
	completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene.getComponent("Scene_4");
			if(comp == null || comp.opaque) break;
		}
		this.occludedScenes = this.scenes.length > 0?this.scenes.slice(ii,this.scenes.length - 1):[];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,show: function(scene) {
		var events = scene.getComponent("Scene_4");
		if(events != null) events.shown.emit();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		return ll > 0?this.scenes[ll - 1]:null;
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0, _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,get_name: function() {
		return "Director_3";
	}
	,__class__: flambe.scene.Director
});
flambe.scene._Director = {}
flambe.scene._Director.Transitor = function() { }
$hxClasses["flambe.scene._Director.Transitor"] = flambe.scene._Director.Transitor;
flambe.scene._Director.Transitor.__name__ = true;
flambe.scene._Director.Transitor.prototype = {
	complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,__class__: flambe.scene._Director.Transitor
}
flambe.scene.Scene = function() { }
$hxClasses["flambe.scene.Scene"] = flambe.scene.Scene;
flambe.scene.Scene.__name__ = true;
flambe.scene.Scene.__super__ = flambe.Component;
flambe.scene.Scene.prototype = $extend(flambe.Component.prototype,{
	get_name: function() {
		return "Scene_4";
	}
	,__class__: flambe.scene.Scene
});
flambe.scene.Transition = function() { }
$hxClasses["flambe.scene.Transition"] = flambe.scene.Transition;
flambe.scene.Transition.__name__ = true;
flambe.scene.Transition.prototype = {
	complete: function() {
	}
	,update: function(dt) {
		return true;
	}
	,__class__: flambe.scene.Transition
}
flambe.util.Arrays = function() { }
$hxClasses["flambe.util.Arrays"] = flambe.util.Arrays;
flambe.util.Arrays.__name__ = true;
flambe.util.Arrays.indexOf = function(arr,element,fromIndex) {
	return arr.indexOf(element,fromIndex);
}
flambe.util.Assert = function() { }
$hxClasses["flambe.util.Assert"] = flambe.util.Assert;
flambe.util.Assert.__name__ = true;
flambe.util.Assert.that = function(condition,message,fields) {
	if(!condition) flambe.util.Assert.fail(message,fields);
}
flambe.util.Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe.util.Strings.withFields(error,fields);
	throw error;
}
flambe.util.BitSets = function() { }
$hxClasses["flambe.util.BitSets"] = flambe.util.BitSets;
flambe.util.BitSets.__name__ = true;
flambe.util.BitSets.add = function(bits,mask) {
	return bits | mask;
}
flambe.util.BitSets.remove = function(bits,mask) {
	return bits & ~mask;
}
flambe.util.BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
}
flambe.util.BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
}
flambe.util.LogLevel = $hxClasses["flambe.util.LogLevel"] = { __ename__ : true, __constructs__ : ["Info","Warn","Error"] }
flambe.util.LogLevel.Info = ["Info",0];
flambe.util.LogLevel.Info.toString = $estr;
flambe.util.LogLevel.Info.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Warn = ["Warn",1];
flambe.util.LogLevel.Warn.toString = $estr;
flambe.util.LogLevel.Warn.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Error = ["Error",2];
flambe.util.LogLevel.Error.toString = $estr;
flambe.util.LogLevel.Error.__enum__ = flambe.util.LogLevel;
flambe.util.Promise = function() {
	this.success = new flambe.util.Signal1();
	this.error = new flambe.util.Signal1();
	this.progressChanged = new flambe.util.Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe.util.Promise;
flambe.util.Promise.__name__ = true;
flambe.util.Promise.prototype = {
	get_total: function() {
		return this._total;
	}
	,set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,__class__: flambe.util.Promise
}
flambe.util.Signal0 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe.util.Signal0;
flambe.util.Signal0.__name__ = true;
flambe.util.Signal0.__super__ = flambe.util.SignalBase;
flambe.util.Signal0.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function() {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,__class__: flambe.util.Signal0
});
flambe.util._SignalBase = {}
flambe.util._SignalBase.Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe.util._SignalBase.Task;
flambe.util._SignalBase.Task.__name__ = true;
flambe.util._SignalBase.Task.prototype = {
	__class__: flambe.util._SignalBase.Task
}
flambe.util.Strings = function() { }
$hxClasses["flambe.util.Strings"] = flambe.util.Strings;
flambe.util.Strings.__name__ = true;
flambe.util.Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,dot + 1,null):null;
}
flambe.util.Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,0,dot):fileName;
}
flambe.util.Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe.util.Strings.getFileExtension(url);
}
flambe.util.Strings.joinPath = function(base,relative) {
	if(StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
	return base + relative;
}
flambe.util.Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		message += message.length > 0?" [":"[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
}
var haxe = {}
haxe.Json = function() {
};
$hxClasses["haxe.Json"] = haxe.Json;
haxe.Json.__name__ = true;
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45, digit = !minus, zero = c == 48;
		var point = false, e = false, pm = false, end = false;
		while(true) {
			c = this.nextChar();
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = Std["int"](f);
		return i == f?i:f;
	}
	,invalidNumber: function(start) {
		throw "Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start);
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.nextChar();
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.nextChar();
				switch(c) {
				case 114:
					buf.addChar(13);
					break;
				case 110:
					buf.addChar(10);
					break;
				case 116:
					buf.addChar(9);
					break;
				case 98:
					buf.addChar(8);
					break;
				case 102:
					buf.addChar(12);
					break;
				case 47:case 92:case 34:
					buf.addChar(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.addChar(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(StringTools.isEof(c)) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.toString();
	}
	,parseRec: function() {
		while(true) {
			var c = this.nextChar();
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						Reflect.setField(obj,field,this.parseRec());
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.nextChar() != 114 || this.nextChar() != 117 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.nextChar() != 97 || this.nextChar() != 108 || this.nextChar() != 115 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.nextChar() != 117 || this.nextChar() != 108 || this.nextChar() != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,nextChar: function() {
		return StringTools.fastCodeAt(this.str,this.pos++);
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + StringTools.fastCodeAt(this.str,this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
haxe.crypto = {}
haxe.crypto.Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["haxe.crypto.Adler32"] = haxe.crypto.Adler32;
haxe.crypto.Adler32.__name__ = true;
haxe.crypto.Adler32.read = function(i) {
	var a = new haxe.crypto.Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
}
haxe.crypto.Adler32.prototype = {
	equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,update: function(b,pos,len) {
		var a1 = this.a1, a2 = this.a2;
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.get(p);
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,__class__: haxe.crypto.Adler32
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,__class__: haxe.io.Bytes
}
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = true;
haxe.io.BytesBuffer.prototype = {
	getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.getData();
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,__class__: haxe.io.BytesBuffer
}
haxe.io.Input = function() { }
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = true;
haxe.io.Input.prototype = {
	readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.getData();
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,readByte: function() {
		return (function($this) {
			var $r;
			throw "Not implemented";
			return $r;
		}(this));
	}
	,__class__: haxe.io.Input
}
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.getData();
	this.pos = pos;
	this.len = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = true;
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.getData();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,__class__: haxe.io.BytesInput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = true;
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.rtti = {}
haxe.rtti.Meta = function() { }
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = true;
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.xml = {}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = true;
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = StringTools.fastCodeAt(str,p);
	var buf = new StringBuf();
	while(!StringTools.isEof(c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.toString() + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && StringTools.fastCodeAt(str,p + 1) == 93 && StringTools.fastCodeAt(str,p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(StringTools.fastCodeAt(str,p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) == 68 || StringTools.fastCodeAt(str,p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) != 45 || StringTools.fastCodeAt(str,p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!haxe.xml.Parser.isValidChar(c)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!haxe.xml.Parser.isValidChar(c)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == StringTools.fastCodeAt(str,start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!haxe.xml.Parser.isValidChar(c)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && StringTools.fastCodeAt(str,p + 1) == 45 && StringTools.fastCodeAt(str,p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && StringTools.fastCodeAt(str,p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(StringTools.fastCodeAt(s,0) == 35) {
					var i = StringTools.fastCodeAt(s,1) == 120?Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)):Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.add("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.toString() + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
}
haxe.zip = {}
haxe.zip.Huffman = $hxClasses["haxe.zip.Huffman"] = { __ename__ : true, __constructs__ : ["Found","NeedBit","NeedBits"] }
haxe.zip.Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; }
haxe.zip.Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; }
haxe.zip.Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; }
haxe.zip.HuffTools = function() {
};
$hxClasses["haxe.zip.HuffTools"] = haxe.zip.HuffTools;
haxe.zip.HuffTools.__name__ = true;
haxe.zip.HuffTools.prototype = {
	make: function(lengths,pos,nlengths,maxbits) {
		var counts = new Array();
		var tmp = new Array();
		if(maxbits > 32) throw "Invalid huffman";
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g = 0;
		while(_g < nlengths) {
			var i = _g++;
			var p = lengths[i + pos];
			if(p >= maxbits) throw "Invalid huffman";
			counts[p]++;
		}
		var code = 0;
		var _g1 = 1, _g = maxbits - 1;
		while(_g1 < _g) {
			var i = _g1++;
			code = code + counts[i] << 1;
			tmp[i] = code;
		}
		var bits = new haxe.ds.IntMap();
		var _g = 0;
		while(_g < nlengths) {
			var i = _g++;
			var l = lengths[i + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.set(n << 5 | l,i);
			}
		}
		return this.treeCompress(haxe.zip.Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw "Invalid huffman";
		var idx = v << 5 | len;
		if(bits.exists(idx)) return haxe.zip.Huffman.Found(bits.get(idx));
		v <<= 1;
		len += 1;
		return haxe.zip.Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,treeWalk: function(table,p,cd,d,t) {
		var $e = (t);
		switch( $e[1] ) {
		case 1:
			var b = $e[3], a = $e[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) return (function($this) {
			var $r;
			var $e = (t);
			switch( $e[1] ) {
			case 1:
				var b = $e[3], a = $e[2];
				$r = haxe.zip.Huffman.NeedBit($this.treeCompress(a),$this.treeCompress(b));
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "assert";
					return $r;
				}($this));
			}
			return $r;
		}(this));
		var size = 1 << d;
		var table = new Array();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(haxe.zip.Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return haxe.zip.Huffman.NeedBits(d,table);
	}
	,treeDepth: function(t) {
		return (function($this) {
			var $r;
			var $e = (t);
			switch( $e[1] ) {
			case 0:
				$r = 0;
				break;
			case 2:
				$r = (function($this) {
					var $r;
					throw "assert";
					return $r;
				}($this));
				break;
			case 1:
				var b = $e[3], a = $e[2];
				$r = (function($this) {
					var $r;
					var da = $this.treeDepth(a);
					var db = $this.treeDepth(b);
					$r = 1 + (da < db?da:db);
					return $r;
				}($this));
				break;
			}
			return $r;
		}(this));
	}
	,__class__: haxe.zip.HuffTools
}
haxe.zip._InflateImpl = {}
haxe.zip._InflateImpl.Window = function(hasCrc) {
	this.buffer = haxe.io.Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new haxe.crypto.Adler32();
};
$hxClasses["haxe.zip._InflateImpl.Window"] = haxe.zip._InflateImpl.Window;
haxe.zip._InflateImpl.Window.__name__ = true;
haxe.zip._InflateImpl.Window.prototype = {
	checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,available: function() {
		return this.pos;
	}
	,getLastChar: function() {
		return this.buffer.get(this.pos - 1);
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.set(this.pos,c);
		this.pos++;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe.io.Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,__class__: haxe.zip._InflateImpl.Window
}
haxe.zip._InflateImpl.State = $hxClasses["haxe.zip._InflateImpl.State"] = { __ename__ : true, __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] }
haxe.zip._InflateImpl.State.Head = ["Head",0];
haxe.zip._InflateImpl.State.Head.toString = $estr;
haxe.zip._InflateImpl.State.Head.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Block = ["Block",1];
haxe.zip._InflateImpl.State.Block.toString = $estr;
haxe.zip._InflateImpl.State.Block.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.CData = ["CData",2];
haxe.zip._InflateImpl.State.CData.toString = $estr;
haxe.zip._InflateImpl.State.CData.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Flat = ["Flat",3];
haxe.zip._InflateImpl.State.Flat.toString = $estr;
haxe.zip._InflateImpl.State.Flat.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Crc = ["Crc",4];
haxe.zip._InflateImpl.State.Crc.toString = $estr;
haxe.zip._InflateImpl.State.Crc.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Dist = ["Dist",5];
haxe.zip._InflateImpl.State.Dist.toString = $estr;
haxe.zip._InflateImpl.State.Dist.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.DistOne = ["DistOne",6];
haxe.zip._InflateImpl.State.DistOne.toString = $estr;
haxe.zip._InflateImpl.State.DistOne.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Done = ["Done",7];
haxe.zip._InflateImpl.State.Done.toString = $estr;
haxe.zip._InflateImpl.State.Done.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip.InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new haxe.zip.HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	this.state = header?haxe.zip._InflateImpl.State.Head:haxe.zip._InflateImpl.State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = new Array();
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new haxe.zip._InflateImpl.Window(crc);
};
$hxClasses["haxe.zip.InflateImpl"] = haxe.zip.InflateImpl;
haxe.zip.InflateImpl.__name__ = true;
haxe.zip.InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var output = new haxe.io.BytesBuffer();
	var inflate = new haxe.zip.InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
}
haxe.zip.InflateImpl.prototype = {
	inflateLoop: function() {
		var _g = this;
		switch( (_g.state)[1] ) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8 || cinfo != 7) throw "Invalid data";
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw "Invalid data";
			if(fdict) throw "Unsupported dictionary";
			this.state = haxe.zip._InflateImpl.State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = haxe.zip._InflateImpl.State.Done;
				return true;
			}
			var crc = haxe.crypto.Adler32.read(this.input);
			if(!calc.equals(crc)) throw "Invalid CRC";
			this.state = haxe.zip._InflateImpl.State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw "Invalid data";
				this.state = haxe.zip._InflateImpl.State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = haxe.zip._InflateImpl.State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[haxe.zip.InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g2 = hclen;
				while(_g2 < 19) {
					var i = _g2++;
					this.lengths[haxe.zip.InflateImpl.CODE_LENGTHS_POS[i]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = new Array();
				var _g3 = 0, _g2 = hlit + hdist;
				while(_g3 < _g2) {
					var i = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = haxe.zip._InflateImpl.State.CData;
				return true;
			default:
				throw "Invalid data";
			}
			break;
		case 3:
			var rlen = this.len < this.needed?this.len:this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) this.state = this["final"]?haxe.zip._InflateImpl.State.Crc:haxe.zip._InflateImpl.State.Block;
			return this.needed > 0;
		case 6:
			var rlen = this.len < this.needed?this.len:this.needed;
			this.addDistOne(rlen);
			this.len -= rlen;
			if(this.len == 0) this.state = haxe.zip._InflateImpl.State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist = this.len < this.dist?this.len:this.dist;
				var rlen = this.needed < rdist?this.needed:rdist;
				this.addDist(this.dist,rlen);
				this.len -= rlen;
			}
			if(this.len == 0) this.state = haxe.zip._InflateImpl.State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				this.state = this["final"]?haxe.zip._InflateImpl.State.Crc:haxe.zip._InflateImpl.State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = haxe.zip.InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw "Invalid data";
				this.len = haxe.zip.InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code = this.huffdist == null?this.getRevBits(5):this.applyHuffman(this.huffdist);
				extra_bits = haxe.zip.InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw "Invalid data";
				this.dist = haxe.zip.InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw "Invalid data";
				this.state = this.dist == 1?haxe.zip._InflateImpl.State.DistOne:haxe.zip._InflateImpl.State.Dist;
				return true;
			}
			break;
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw "Invalid data";
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw "Invalid data";
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw "Invalid data";
				break;
			default:
				throw "Invalid data";
			}
		}
	}
	,applyHuffman: function(h) {
		return (function($this) {
			var $r;
			var $e = (h);
			switch( $e[1] ) {
			case 0:
				var n = $e[2];
				$r = n;
				break;
			case 1:
				var b = $e[3], a = $e[2];
				$r = $this.applyHuffman($this.getBit()?b:a);
				break;
			case 2:
				var tbl = $e[3], n = $e[2];
				$r = $this.applyHuffman(tbl[$this.getBits(n)]);
				break;
			}
			return $r;
		}(this));
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.set(this.outpos,b);
		this.needed--;
		this.outpos++;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,getRevBits: function(n) {
		return n == 0?0:this.getBit()?1 << n - 1 | this.getRevBits(n - 1):this.getRevBits(n - 1);
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,buildFixedHuffman: function() {
		if(haxe.zip.InflateImpl.FIXED_HUFFMAN != null) return haxe.zip.InflateImpl.FIXED_HUFFMAN;
		var a = new Array();
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		haxe.zip.InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return haxe.zip.InflateImpl.FIXED_HUFFMAN;
	}
	,__class__: haxe.zip.InflateImpl
}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js.Boot.isClass(o) || js.Boot.isEnum(o))) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = true;
js.Lib["eval"] = function(code) {
	return eval(code);
}
var urgame = {}
urgame.Coin = function(o) {
	this.remove = false;
	var bodyDef = new box2D.dynamics.B2BodyDef();
	bodyDef.type = box2D.dynamics.B2Body.b2_staticBody;
	bodyDef.position.set((o.x + o.width / 2) / urgame.GameLayer.PTM,(o.y + o.height / 2) / urgame.GameLayer.PTM);
	this.body = urgame.GameLayer.world.createBody(bodyDef);
	this.body.name = "coin";
	var shape = new box2D.collision.shapes.B2CircleShape();
	shape.setRadius(o.width / 2 / urgame.GameLayer.PTM);
	var fixtureDef = new box2D.dynamics.B2FixtureDef();
	fixtureDef.shape = shape;
	this.body.createFixture(fixtureDef);
	this.image = new flambe.display.ImageSprite(urgame.Pack.pack.getTexture("test/coin"));
	this.image.setXY(o.x,o.y);
	this.body.setUserData(this);
};
$hxClasses["urgame.Coin"] = urgame.Coin;
urgame.Coin.__name__ = true;
urgame.Coin.__super__ = flambe.Component;
urgame.Coin.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this.remove) this.dispose();
	}
	,onRemoved: function() {
		this.owner.dispose();
		this.body.getWorld().destroyBody(this.body);
	}
	,onAdded: function() {
		this.owner.add(this.image);
	}
	,get_name: function() {
		return "Coin_7";
	}
	,__class__: urgame.Coin
});
urgame.ContactListener = function() {
	box2D.dynamics.B2ContactListener.call(this);
};
$hxClasses["urgame.ContactListener"] = urgame.ContactListener;
urgame.ContactListener.__name__ = true;
urgame.ContactListener.__super__ = box2D.dynamics.B2ContactListener;
urgame.ContactListener.prototype = $extend(box2D.dynamics.B2ContactListener.prototype,{
	pushCrate: function(contact) {
		var fixtureA = contact.getFixtureA();
		var fixtureB = contact.getFixtureB();
		var crateFixture = null;
		var playerFixture = null;
		if(fixtureA.getBody().name.indexOf("crate") != -1) {
			crateFixture = fixtureA;
			playerFixture = fixtureB;
		} else if(fixtureB.getBody().name.indexOf("crate") != -1) {
			crateFixture = fixtureB;
			playerFixture = fixtureA;
		}
		if(crateFixture == null) return false;
		if(playerFixture.getBody().name != "player") return false;
		crateFixture.getBody().setLinearVelocity(new box2D.common.math.B2Vec2(0,crateFixture.getBody().getLinearVelocity().y));
		return false;
	}
	,touchPlatform: function(contact) {
		var fixtureA = contact.getFixtureA();
		var fixtureB = contact.getFixtureB();
		var platformFixture = null;
		var otherFixture = null;
		if(fixtureA.getBody().name.indexOf("platform") != -1) {
			platformFixture = fixtureA;
			otherFixture = fixtureB;
		} else if(fixtureB.getBody().name.indexOf("platform") != -1) {
			platformFixture = fixtureB;
			otherFixture = fixtureA;
		}
		if(platformFixture == null) return false;
		if(otherFixture.getBody().name.indexOf("player") == -1) return false;
		var platformBody = platformFixture.getBody();
		var otherBody = otherFixture.getBody();
		var numPoints = contact.getManifold().m_pointCount;
		var worldManifold = new box2D.collision.B2WorldManifold();
		contact.getWorldManifold(worldManifold);
		var otherY = otherBody.getPosition().y * urgame.GameLayer.PTM + otherBody.getUserData().height / 2;
		var platformY = platformBody.getPosition().y * urgame.GameLayer.PTM;
		var _g = 0;
		while(_g < numPoints) {
			var i = _g++;
			var pointVelPlatform = platformBody.getLinearVelocityFromWorldPoint(worldManifold.m_points[i]);
			var pointVelOther = otherBody.getLinearVelocityFromWorldPoint(worldManifold.m_points[i]);
			var relativeVel = platformBody.getLocalVector(new box2D.common.math.B2Vec2(pointVelOther.x - pointVelPlatform.x,pointVelPlatform.y - pointVelOther.y));
			if(otherY <= platformY + 5) {
				if(relativeVel.y < 0) {
					otherBody.getUserData().status = urgame.Status.Idle;
					return true;
				}
			}
		}
		contact.setEnabled(false);
		return false;
	}
	,getCoin: function(contact) {
		var fixtureA = contact.getFixtureA();
		var fixtureB = contact.getFixtureB();
		var coinFixture = null;
		var otherFixture = null;
		if(fixtureA.getBody().name.indexOf("coin") != -1) {
			coinFixture = fixtureA;
			otherFixture = fixtureB;
		} else if(fixtureB.getBody().name.indexOf("coin") != -1) {
			coinFixture = fixtureB;
			otherFixture = fixtureA;
		}
		if(coinFixture == null) return false;
		if(otherFixture.getBody().name != "player") return false;
		contact.setEnabled(false);
		var coin = coinFixture.getBody().getUserData();
		coin.remove = true;
		return true;
	}
	,endContact: function(contact) {
		contact.setEnabled(true);
		if(this.pushCrate(contact)) return;
	}
	,beginContact: function(contact) {
		this.getCoin(contact);
		var fixtureA = contact.getFixtureA();
		var fixtureB = contact.getFixtureB();
		var playerBody = null;
		var goundBody;
		if(fixtureA.getBody().name.indexOf("ground") != -1) playerBody = fixtureB.getBody(); else if(fixtureB.getBody().name.indexOf("ground") != -1) playerBody = fixtureA.getBody();
		if(playerBody != null) {
			if(playerBody.name.indexOf("player") != -1) playerBody.getUserData().status = urgame.Status.Idle;
		}
	}
	,preSolve: function(contact,oldManifold) {
		if(this.touchPlatform(contact)) return;
	}
	,__class__: urgame.ContactListener
});
urgame.Crate = function(o) {
	this.sprite = new flambe.display.ImageSprite(urgame.Pack.pack.getTexture("test/box"));
	this.sprite.setXY(o.x + 16,o.y + 16);
	this.sprite.centerAnchor();
	var bodyDef = new box2D.dynamics.B2BodyDef();
	bodyDef.type = box2D.dynamics.B2Body.b2_dynamicBody;
	bodyDef.position.set((o.x + o.width / 2) / urgame.GameLayer.PTM,(o.y + o.height / 2) / urgame.GameLayer.PTM);
	this.body = urgame.GameLayer.world.createBody(bodyDef);
	this.body.name = "crateground";
	var shape = new box2D.collision.shapes.B2PolygonShape();
	shape.setAsBox(o.width / urgame.GameLayer.PTM,o.height / urgame.GameLayer.PTM);
	var fixtureDef = new box2D.dynamics.B2FixtureDef();
	fixtureDef.shape = shape;
	fixtureDef.density = 1;
	this.body.createFixture(fixtureDef);
	this.body.setUserData(this);
};
$hxClasses["urgame.Crate"] = urgame.Crate;
urgame.Crate.__name__ = true;
urgame.Crate.__super__ = flambe.Component;
urgame.Crate.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		this.sprite.x.set__(this.body.getPosition().x * urgame.GameLayer.PTM);
		this.sprite.y.set__(this.body.getPosition().y * urgame.GameLayer.PTM);
		this.sprite.rotation.set__(this.body.getAngle() * (180 / Math.PI));
	}
	,onRemoved: function() {
		this.owner.dispose();
		urgame.GameLayer.world.destroyBody(this.body);
	}
	,onAdded: function() {
		this.owner.add(this.sprite);
	}
	,get_name: function() {
		return "Crate_6";
	}
	,__class__: urgame.Crate
});
urgame.Direction = $hxClasses["urgame.Direction"] = { __ename__ : true, __constructs__ : ["Right","Left"] }
urgame.Direction.Right = ["Right",0];
urgame.Direction.Right.toString = $estr;
urgame.Direction.Right.__enum__ = urgame.Direction;
urgame.Direction.Left = ["Left",1];
urgame.Direction.Left.toString = $estr;
urgame.Direction.Left.__enum__ = urgame.Direction;
urgame.GameLayer = function() {
	this.tmpY = 0;
	this.tmpX = 0;
	this.isDebug = false;
	this.map = new dev.tilemap.TMXTiledMap(urgame.Pack.pack,"test/glitch.tmx","test");
	urgame.GameLayer.world = new box2D.dynamics.B2World(new box2D.common.math.B2Vec2(0,9.8),true);
	this.initPlatform();
	this.initPlayer();
	this.initGround();
	this.initCoin();
	this.initCrate();
	if(this.isDebug) {
		this.debugDraw = new box2D.dynamics.B2DebugDraw();
		this.debugDraw.setDrawScale(urgame.GameLayer.PTM);
		this.debugDraw.setFlags(box2D.dynamics.B2DebugDraw.e_shapeBit);
		var ds = new box2D.dynamics.B2DebugSprite();
		this.debugSprite = new flambe.display.ImageSprite(ds.canvas);
		this.debugDraw.setSprite(ds);
		urgame.GameLayer.world.setDebugDraw(this.debugDraw);
	}
	urgame.GameLayer.world.setContactListener(new urgame.ContactListener());
	this.tmpY = urgame.GameLayer.GAME_HEIGHT;
};
$hxClasses["urgame.GameLayer"] = urgame.GameLayer;
urgame.GameLayer.__name__ = true;
urgame.GameLayer.__super__ = flambe.Component;
urgame.GameLayer.prototype = $extend(flambe.Component.prototype,{
	updateViewportX: function() {
		var diff = this.player.position.x - (this.tmpX + urgame.GameLayer.GAME_WIDTH / 3);
		if(diff > 0) {
			if(this.mapSprite.x.get__() <= -5000) return;
			this.tmpX += diff;
			var _g = this.mapSprite.x;
			_g.set__(_g.get__() - diff);
			return;
		}
		diff = this.player.position.x - (this.tmpX + urgame.GameLayer.GAME_WIDTH / 3);
		if(diff < 0) {
			if(this.mapSprite.x.get__() >= 0) return;
			this.tmpX += diff;
			var _g = this.mapSprite.x;
			_g.set__(_g.get__() - diff);
			return;
		}
	}
	,onUpdate: function(dt) {
		urgame.GameLayer.world.step(1 / 60,10,6);
		urgame.GameLayer.world.clearForces();
		if(this.isDebug) {
			this.debugDraw.getSprite().clear();
			urgame.GameLayer.world.drawDebugData();
		}
		this.updateViewportX();
	}
	,initCrate: function() {
		this.crateLayer = new flambe.Entity();
		var crates = this.map.getObjectGroup("Crate");
		var _g = 0, _g1 = crates.getObjects();
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			var crate = new urgame.Crate(c);
			this.crateLayer.addChild(new flambe.Entity().add(crate));
		}
	}
	,initCoin: function() {
		this.coinLayer = new flambe.Entity();
		var coins = this.map.getObjectGroup("Coin");
		var _g = 0, _g1 = coins.getObjects();
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(!o.isCircle) continue;
			var c = new urgame.Coin(o);
			this.coinLayer.addChild(new flambe.Entity().add(c));
		}
	}
	,initGround: function() {
		var ground = this.map.getObjectGroup("Ground");
		var _g = 0, _g1 = ground.getObjects();
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(!o.isPolyline) continue;
			var startingPoint = new flambe.math.Point(o.x / urgame.GameLayer.PTM,o.y / urgame.GameLayer.PTM);
			var _g3 = 0, _g2 = o.vertexs.length - 1;
			while(_g3 < _g2) {
				var i = _g3++;
				var bodyDef = new box2D.dynamics.B2BodyDef();
				bodyDef.type = box2D.dynamics.B2Body.b2_staticBody;
				var p1x = o.vertexs[i].x / urgame.GameLayer.PTM + startingPoint.x;
				var p1y = o.vertexs[i].y / urgame.GameLayer.PTM + startingPoint.y;
				var p2x = o.vertexs[i + 1].x / urgame.GameLayer.PTM + startingPoint.x;
				var p2y = o.vertexs[i + 1].y / urgame.GameLayer.PTM + startingPoint.y;
				bodyDef.position.set((p1x + p2x) / 2,(p1y + p2y) / 2);
				var shape = new box2D.collision.shapes.B2PolygonShape();
				shape.setAsEdge(new box2D.common.math.B2Vec2((p1x - p2x) / 2,(p1y - p2y) / 2),new box2D.common.math.B2Vec2((p2x - p1x) / 2,(p2y - p1y) / 2));
				var fixtureDef = new box2D.dynamics.B2FixtureDef();
				fixtureDef.shape = shape;
				var body = urgame.GameLayer.world.createBody(bodyDef);
				body.name = "ground";
				body.createFixture(fixtureDef);
			}
		}
	}
	,initPlayer: function() {
		this.player = new urgame.Player(this);
	}
	,initPlatform: function() {
		var platforms = this.map.getObjectGroup("Platform");
		var _g = 0, _g1 = platforms.getObjects();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var bodyDef = new box2D.dynamics.B2BodyDef();
			bodyDef.type = box2D.dynamics.B2Body.b2_staticBody;
			bodyDef.position.set((p.x + p.width / 2) / urgame.GameLayer.PTM,p.y / urgame.GameLayer.PTM);
			var body = urgame.GameLayer.world.createBody(bodyDef);
			body.name = "platform";
			var shape = new box2D.collision.shapes.B2PolygonShape();
			shape.setAsEdge(new box2D.common.math.B2Vec2(-p.width / 2 / urgame.GameLayer.PTM,0),new box2D.common.math.B2Vec2(p.width / 2 / urgame.GameLayer.PTM));
			var fixtureDef = new box2D.dynamics.B2FixtureDef();
			fixtureDef.shape = shape;
			body.createFixture(fixtureDef);
		}
	}
	,handlePointerDown: function(event) {
		if(event.viewY / urgame.Params.AUTO_SCALE < urgame.GameLayer.GAME_HEIGHT / 2) this.player.jump(); else {
			if(event.viewX / urgame.Params.AUTO_SCALE < urgame.GameLayer.GAME_WIDTH / 2) this.player.dir = urgame.Direction.Left; else this.player.dir = urgame.Direction.Right;
			this.player.walk();
		}
	}
	,handlePointerUp: function(event) {
		this.player.stop();
	}
	,onAdded: function() {
		this._disposer = new flambe.Disposer();
		this.owner.add(this._disposer);
		this._disposer.connect1(flambe.System.get_pointer().up,$bind(this,this.handlePointerUp));
		this._disposer.connect1(flambe.System.get_pointer().down,$bind(this,this.handlePointerDown));
		this.owner.addChild(this.map.getRoot());
		this.owner.addChild(new flambe.Entity().add(this.player));
		if(this.isDebug) this.owner.addChild(new flambe.Entity().add(this.debugSprite));
		this.owner.add(this.mapSprite = new flambe.display.Sprite());
		this.owner.addChild(this.coinLayer);
		this.owner.addChild(this.crateLayer);
	}
	,get_name: function() {
		return "GameLayer_5";
	}
	,__class__: urgame.GameLayer
});
urgame.Main = function() { }
$hxClasses["urgame.Main"] = urgame.Main;
urgame.Main.__name__ = true;
urgame.Main.main = function() {
	flambe.System.init();
	var manifest = flambe.asset.Manifest.build("bootstrap");
	var loader = flambe.System.loadAssetPack(manifest);
	loader.get(urgame.Main.onSuccess);
}
urgame.Main.onSuccess = function(pack) {
	urgame.GameLayer.GAME_HEIGHT = 900;
	urgame.GameLayer.GAME_WIDTH = 1539;
	urgame.Pack.pack = pack;
	var sprite = new flambe.display.Sprite();
	flambe.System.root.add(sprite);
	flambe.System.root.add(new urgame.SizeController());
	var e = new flambe.Entity();
	var s = new urgame.GameLayer();
	e.add(s);
	flambe.System.root.addChild(e);
}
urgame.Pack = function() { }
$hxClasses["urgame.Pack"] = urgame.Pack;
urgame.Pack.__name__ = true;
urgame.Params = function() { }
$hxClasses["urgame.Params"] = urgame.Params;
urgame.Params.__name__ = true;
urgame.Player = function(gameLayer) {
	this.speedY = 0;
	this.speedX = 0;
	this.height = 100;
	this.width = 90;
	this.walkPlayer = new dev.display.SpriteSheetPlayer(urgame.Pack.pack,"sprite/base.plist");
	this.jumpPlayer = new dev.display.SpriteSheetPlayer(urgame.Pack.pack,"sprite/jump.plist");
	this.status = urgame.Status.Idle;
	this.dir = urgame.Direction.Right;
	var map = gameLayer.map;
	var object = map.getObjectGroup("Player").getObjects()[0];
	this.position = new flambe.math.Point(object.x,object.y);
	var bodyDef = new box2D.dynamics.B2BodyDef();
	var fixtureDef = new box2D.dynamics.B2FixtureDef();
	var shape = new box2D.collision.shapes.B2PolygonShape();
	bodyDef.type = box2D.dynamics.B2Body.b2_dynamicBody;
	bodyDef.position.set((this.position.x - this.width / 2 - 10) / urgame.GameLayer.PTM,(this.position.y - this.height / 2) / urgame.GameLayer.PTM);
	this.body = urgame.GameLayer.world.createBody(bodyDef);
	this.body.setSleepingAllowed(false);
	this.body.setFixedRotation(true);
	shape.setAsBox(this.width / 2 / urgame.GameLayer.PTM - 0.7,this.height / 2 / urgame.GameLayer.PTM);
	fixtureDef.shape = shape;
	fixtureDef.density = 1;
	this.body.createFixture(fixtureDef);
	this.body.name = "player";
	this.body.setUserData(this);
};
$hxClasses["urgame.Player"] = urgame.Player;
urgame.Player.__name__ = true;
urgame.Player.__super__ = flambe.Component;
urgame.Player.prototype = $extend(flambe.Component.prototype,{
	stop: function() {
		this.speedX = 0;
		if(this.status == urgame.Status.Jump) return;
		this.status = urgame.Status.Idle;
	}
	,jump: function() {
		if(this.status == urgame.Status.Jump) return;
		this.status = urgame.Status.Jump;
		this.entity.add(this.jumpPlayer);
		this.jumpPlayer.play();
		this.jumpPlayer.setSpeed(50);
		this.body.applyImpulse(new box2D.common.math.B2Vec2(0,-60),this.body.getWorldCenter());
	}
	,walk: function() {
		if(this.status == urgame.Status.Walk) return;
		if(this.status == urgame.Status.Jump) {
			if(this.dir == urgame.Direction.Left) this.speedX = -10; else this.speedX = 10;
			return;
		}
		this.entity.add(this.walkPlayer);
		this.walkPlayer.loop();
		this.walkPlayer.setSpeed(50);
		this.status = urgame.Status.Walk;
		if(this.dir == urgame.Direction.Left) this.speedX = -10; else this.speedX = 10;
	}
	,onRemoved: function() {
	}
	,onUpdate: function(dt) {
		if(this.status == urgame.Status.Walk) this.speedY = this.body.getLinearVelocity().y; else this.speedY = this.body.getLinearVelocity().y;
		if(this.status == urgame.Status.Jump) {
		}
		this.body.setLinearVelocity(new box2D.common.math.B2Vec2(this.speedX,this.speedY));
		this.controlSprite.x.set__(this.body.getPosition().x * urgame.GameLayer.PTM - this.width / 2);
		this.controlSprite.y.set__(this.body.getPosition().y * urgame.GameLayer.PTM - this.height / 2 - 16);
		this.position.x = this.controlSprite.x.get__();
		this.position.y = this.controlSprite.y.get__();
	}
	,onAdded: function() {
		this.entity = new flambe.Entity();
		this.controlSprite = new flambe.display.Sprite();
		this.entity.add(this.controlSprite);
		this.controlSprite.y.set__(this.position.y);
		this.controlSprite.x.set__(this.position.x);
		this.owner.addChild(this.entity);
		this.entity.add(this.walkPlayer);
		this.walkPlayer.loop();
		this.walkPlayer.setSpeed(50);
	}
	,get_name: function() {
		return "Player_8";
	}
	,__class__: urgame.Player
});
urgame.SizeController = function() {
	this._document = { canvasScale : 1};
	urgame.Params.AUTO_SCALE = this._document.canvanScale;
};
$hxClasses["urgame.SizeController"] = urgame.SizeController;
urgame.SizeController.__name__ = true;
urgame.SizeController.__super__ = flambe.Component;
urgame.SizeController.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		urgame.Params.AUTO_SCALE = this._document.canvasScale;
		if(this._document.canvasScale != null && urgame.Params.AUTO_SCALE != this._scaleSprite.scaleX.get__()) {
			this._scaleSprite.scaleX.set__(urgame.Params.AUTO_SCALE);
			this._scaleSprite.scaleY.set__(this._scaleSprite.scaleX.get__());
		}
	}
	,onAdded: function() {
		this._scaleSprite = this.owner.getComponent("Sprite_2");
		this._document = js.Lib["eval"]("document");
	}
	,get_name: function() {
		return "SizeController_11";
	}
	,__class__: urgame.SizeController
});
urgame.Status = $hxClasses["urgame.Status"] = { __ename__ : true, __constructs__ : ["Jump","Walk","Idle"] }
urgame.Status.Jump = ["Jump",0];
urgame.Status.Jump.toString = $estr;
urgame.Status.Jump.__enum__ = urgame.Status;
urgame.Status.Walk = ["Walk",1];
urgame.Status.Walk.toString = $estr;
urgame.Status.Walk.__enum__ = urgame.Status;
urgame.Status.Idle = ["Idle",2];
urgame.Status.Idle.toString = $estr;
urgame.Status.Idle.__enum__ = urgame.Status;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
if(typeof(JSON) != "undefined") haxe.Json = JSON;
box2D.collision.B2Collision.s_incidentEdge = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_clipPoints1 = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_clipPoints2 = box2D.collision.B2Collision.makeClipPointVector();
box2D.collision.B2Collision.s_edgeAO = new Array();
box2D.collision.B2Collision.s_edgeBO = new Array();
box2D.collision.B2Collision.s_localTangent = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_localNormal = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_planePoint = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_normal = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_tangent = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_tangent2 = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_v11 = new box2D.common.math.B2Vec2();
box2D.collision.B2Collision.s_v12 = new box2D.common.math.B2Vec2();
box2D.collision.B2Distance.s_simplex = new box2D.collision.B2Simplex();
box2D.collision.B2Distance.s_saveA = new Array();
box2D.collision.B2Distance.s_saveB = new Array();
box2D.collision.B2DynamicTreeNode.currentID = 0;
box2D.collision.B2TimeOfImpact.b2_toiCalls = 0;
box2D.collision.B2TimeOfImpact.b2_toiIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiMaxIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiRootIters = 0;
box2D.collision.B2TimeOfImpact.b2_toiMaxRootIters = 0;
box2D.collision.B2TimeOfImpact.s_cache = new box2D.collision.B2SimplexCache();
box2D.collision.B2TimeOfImpact.s_distanceInput = new box2D.collision.B2DistanceInput();
box2D.collision.B2TimeOfImpact.s_xfA = new box2D.common.math.B2Transform();
box2D.collision.B2TimeOfImpact.s_xfB = new box2D.common.math.B2Transform();
box2D.collision.B2TimeOfImpact.s_fcn = new box2D.collision.B2SeparationFunction();
box2D.collision.B2TimeOfImpact.s_distanceOutput = new box2D.collision.B2DistanceOutput();
box2D.common.B2Settings.b2_pi = Math.PI;
box2D.common.B2Settings.b2_maxManifoldPoints = 2;
box2D.common.B2Settings.b2_aabbExtension = 0.1;
box2D.common.B2Settings.b2_aabbMultiplier = 2.0;
box2D.common.B2Settings.b2_linearSlop = 0.005;
box2D.common.B2Settings.b2_maxTOIContactsPerIsland = 32;
box2D.common.B2Settings.b2_maxTOIJointsPerIsland = 32;
box2D.common.B2Settings.b2_velocityThreshold = 1.0;
box2D.common.B2Settings.b2_maxLinearCorrection = 0.2;
box2D.common.B2Settings.b2_maxTranslation = 2.0;
box2D.common.B2Settings.b2_maxTranslationSquared = box2D.common.B2Settings.b2_maxTranslation * box2D.common.B2Settings.b2_maxTranslation;
box2D.common.B2Settings.b2_maxRotation = 0.5 * box2D.common.B2Settings.b2_pi;
box2D.common.B2Settings.b2_maxRotationSquared = box2D.common.B2Settings.b2_maxRotation * box2D.common.B2Settings.b2_maxRotation;
box2D.common.B2Settings.b2_contactBaumgarte = 0.2;
box2D.common.B2Settings.b2_timeToSleep = 0.5;
box2D.common.B2Settings.b2_linearSleepTolerance = 0.01;
box2D.common.B2Settings.b2_angularSleepTolerance = 2.0 / 180.0 * box2D.common.B2Settings.b2_pi;
box2D.dynamics.B2Body.s_xf1 = new box2D.common.math.B2Transform();
box2D.dynamics.B2Body.e_islandFlag = 1;
box2D.dynamics.B2Body.e_awakeFlag = 2;
box2D.dynamics.B2Body.e_allowSleepFlag = 4;
box2D.dynamics.B2Body.e_bulletFlag = 8;
box2D.dynamics.B2Body.e_fixedRotationFlag = 16;
box2D.dynamics.B2Body.e_activeFlag = 32;
box2D.dynamics.B2Body.b2_staticBody = 0;
box2D.dynamics.B2Body.b2_kinematicBody = 1;
box2D.dynamics.B2Body.b2_dynamicBody = 2;
box2D.dynamics.B2ContactFilter.b2_defaultFilter = new box2D.dynamics.B2ContactFilter();
box2D.dynamics.B2ContactListener.b2_defaultListener = new box2D.dynamics.B2ContactListener();
box2D.dynamics.B2DebugDraw.e_shapeBit = 1;
box2D.dynamics.B2DebugDraw.e_jointBit = 2;
box2D.dynamics.B2DebugDraw.e_aabbBit = 4;
box2D.dynamics.B2DebugDraw.e_pairBit = 8;
box2D.dynamics.B2DebugDraw.e_centerOfMassBit = 16;
box2D.dynamics.B2DebugDraw.e_controllerBit = 32;
box2D.dynamics.B2DebugSprite.OFFSET_Y = 0;
box2D.dynamics.B2DebugSprite.OFFSET_X = 0;
box2D.dynamics.B2DebugSprite.TEXTURE_WIDTH = 5000;
box2D.dynamics.B2DebugSprite.TEXTURE_HEIGHT = 1200;
box2D.dynamics.B2Island.s_impulse = new box2D.dynamics.B2ContactImpulse();
box2D.dynamics.B2World.s_timestep2 = new box2D.dynamics.B2TimeStep();
box2D.dynamics.B2World.s_xf = new box2D.common.math.B2Transform();
box2D.dynamics.B2World.s_backupA = new box2D.common.math.B2Sweep();
box2D.dynamics.B2World.s_backupB = new box2D.common.math.B2Sweep();
box2D.dynamics.B2World.s_timestep = new box2D.dynamics.B2TimeStep();
box2D.dynamics.B2World.s_queue = new Array();
box2D.dynamics.B2World.s_jointColor = new box2D.common.B2Color(0.5,0.8,0.8);
box2D.dynamics.B2World.e_newFixture = 1;
box2D.dynamics.B2World.e_locked = 2;
box2D.dynamics.contacts.B2Contact.e_sensorFlag = 1;
box2D.dynamics.contacts.B2Contact.e_continuousFlag = 2;
box2D.dynamics.contacts.B2Contact.e_islandFlag = 4;
box2D.dynamics.contacts.B2Contact.e_toiFlag = 8;
box2D.dynamics.contacts.B2Contact.e_touchingFlag = 16;
box2D.dynamics.contacts.B2Contact.e_enabledFlag = 32;
box2D.dynamics.contacts.B2Contact.e_filterFlag = 64;
box2D.dynamics.contacts.B2Contact.s_input = new box2D.collision.B2TOIInput();
box2D.dynamics.contacts.B2ContactSolver.s_worldManifold = new box2D.collision.B2WorldManifold();
box2D.dynamics.contacts.B2ContactSolver.s_psm = new box2D.dynamics.contacts.B2PositionSolverManifold();
flambe.display.Sprite._scratchPoint = new flambe.math.Point();
dev.tilemap.TMXGZip.LITERALS = 288;
dev.tilemap.TMXGZip.NAMEMAX = 256;
dev.tilemap.TMXGZip.bitReverse = [0,128,64,192,32,160,96,224,16,144,80,208,48,176,112,240,8,136,72,200,40,168,104,232,24,152,88,216,56,184,120,248,4,132,68,196,36,164,100,228,20,148,84,212,52,180,116,244,12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,3,131,67,195,35,163,99,227,19,147,83,211,51,179,115,243,11,139,75,203,43,171,107,235,27,155,91,219,59,187,123,251,7,135,71,199,39,167,103,231,23,151,87,215,55,183,119,247,15,143,79,207,47,175,111,239,31,159,95,223,63,191,127,255];
dev.tilemap.TMXGZip.cplens = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];
dev.tilemap.TMXGZip.cplext = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99];
dev.tilemap.TMXGZip.cpdist = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
dev.tilemap.TMXGZip.cpdext = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
dev.tilemap.TMXGZip.border = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
dev.tilemap.TMXTiledMap.useViewport = false;
dev.tilemap.TMXTiledMap.viewport = new dev.math.Rectangle();
dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ORTHO = 0;
dev.tilemap.TMXTiledMap.TMX_ORIENTATION_HEX = 1;
dev.tilemap.TMXTiledMap.TMX_ORIENTATION_ISO = 2;
dev.tilemap.TMXXMLParser.TMX_LAYER_ATTRIB_NONE = 1 << 0;
dev.tilemap.TMXXMLParser.TMX_PROPERTY_NONE = 0;
flambe.platform.html.HtmlPlatform.instance = new flambe.platform.html.HtmlPlatform();
flambe.util.SignalBase.DISPATCHING_SENTINEL = new flambe.util.SignalConnection(null,null);
flambe.System.root = new flambe.Entity();
flambe.System.uncaughtError = new flambe.util.Signal1();
flambe.System.hidden = new flambe.util.Value(false);
flambe.System.hasGPU = new flambe.util.Value(false);
flambe.System.volume = new flambe.animation.AnimatedFloat(1);
flambe.System._platform = flambe.platform.html.HtmlPlatform.instance;
flambe.System._calledInit = false;
flambe.Log.logger = flambe.System.createLogger("flambe");
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.Browser.location = typeof window != "undefined" ? window.location : null;
js.Browser.navigator = typeof window != "undefined" ? window.navigator : null;
flambe.asset.Manifest.__meta__ = { obj : { assets : [{ bootstrap : [{ bytes : 25158, md5 : "ab55d81a348e4c2ad531452c0ee18a14", name : "Font/KarenBlack24ptFont.fnt"},{ bytes : 14951, md5 : "67a3820fa06ab8503234e42d3012d0d7", name : "Font/KarenBlack24ptFont.png"},{ bytes : 25158, md5 : "68290bd79c2288884531e4b9d9d9e88c", name : "Font/KarenGreen24ptFont.fnt"},{ bytes : 14951, md5 : "cbb909dc468477115c754ee17e49ddff", name : "Font/KarenGreen24ptFont.png"},{ bytes : 6308, md5 : "8390752a1520138ae856027fcab258fe", name : "sprite/base.plist"},{ bytes : 151758, md5 : "f066decb5053f54fe99259efef8b4799", name : "sprite/base.png"},{ bytes : 16181, md5 : "7048bfa703179319b4453c8f7da482ad", name : "sprite/jump.plist"},{ bytes : 341919, md5 : "3de41ca0f247dd6401b4ebcd1ca0c53e", name : "sprite/jump.png"},{ bytes : 32905, md5 : "0d7091740986b72f83e602f94b98c802", name : "test/bg2_01.jpg"},{ bytes : 33979, md5 : "9bf720435ae3276301c14f7d12739f00", name : "test/bg2_02.jpg"},{ bytes : 33473, md5 : "ba789e3e04da5bb6c230b4805dae38d7", name : "test/bg2_03.jpg"},{ bytes : 38216, md5 : "3879d53325379b9ad6591e6aaaea439e", name : "test/bg2_04.jpg"},{ bytes : 38174, md5 : "5d5f4ea58fb2045e3a34c02d7d478a53", name : "test/bg2_05.jpg"},{ bytes : 7820, md5 : "3cc1b7e9fd3fea3e2b460eb6fbbba4ff", name : "test/box.png"},{ bytes : 6413, md5 : "434a9fefc6aa631e5d9231169e679069", name : "test/coin.png"},{ bytes : 5650, md5 : "6e4420a1e226be4a0af7f09e613d06c1", name : "test/glitch.tmx"}]}]}};
flambe.asset.Manifest._supportsCrossOrigin = (function() {
	var blacklist = new EReg("\\b(Android)\\b","");
	if(blacklist.match(js.Browser.window.navigator.userAgent)) return false;
	var xhr = new XMLHttpRequest();
	return xhr.withCredentials != null;
})();
flambe.platform.BasicKeyboard._sharedEvent = new flambe.input.KeyboardEvent();
flambe.platform.BasicMouse._sharedEvent = new flambe.input.MouseEvent();
flambe.platform.BasicPointer._sharedEvent = new flambe.input.PointerEvent();
flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js.Browser.window.navigator.userAgent);
})();
flambe.platform.html.HtmlAssetPackLoader._mediaRefCount = 0;
flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = true;
flambe.platform.html.HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js.Browser.window.top == js.Browser.window && new EReg("Mobile(/.*)? Safari","").match(js.Browser.navigator.userAgent);
flambe.platform.html.WebAudioSound._detectSupport = true;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
haxe.zip.InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
haxe.zip.InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
haxe.zip.InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
haxe.zip.InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
haxe.zip.InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
urgame.GameLayer.PTM = 30;
urgame.Params.AUTO_SCALE = 1;
urgame.Main.main();
})();

//@ sourceMappingURL=main-html.js.map