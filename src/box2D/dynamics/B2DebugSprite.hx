package box2D.dynamics;
import flambe.display.Graphics;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import box2D.common.math.B2Transform;
import box2D.common.math.B2Vec2;
import box2D.common.B2Color;
import flambe.math.Rectangle;
import flambe.System;
/**
 * ...
 * @author Ang Li(李昂)
 */
class B2DebugSprite
{
	#if js
	public static var CIRCLE : Int = 1;
	public static var POLYGON : Int = 2;
	public static var EDGE_SHAPE : Int = 3 ;
	
	public static var OFFSET_Y = 0;
	public static var OFFSET_X = 0;
	public static var TEXTURE_WIDTH = 5000;
	public static var TEXTURE_HEIGHT = 1200;
	var g : Graphics;
	var flag : Int = -1;
	
	public var imageSprite : ImageSprite;
	public var canvas : Texture;
	public var rec : Rectangle;
	public function new() 
	{
		canvas = System.createTexture(TEXTURE_WIDTH, TEXTURE_HEIGHT);
		canvas.graphics.translate(OFFSET_X, OFFSET_Y);
		//canvas.graphics.fillRect(0x000000, 0, 0, 1000, 700);
		rec = new Rectangle();
		rec.width = System.stage.width;
		rec.height = System.stage.height;
	}
	
	public function drawTransform(xf : B2Transform, drawScale : Float) {
		var s = canvas.graphics;
		s.beginPath();
      //s.strokeStyle = 0xff0000;
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + 1* xf.R.col1.x) * drawScale, (xf.position.y + 1 * xf.R.col1.y) * drawScale);

      //s.strokeStyle = 0xff00;
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + 1 * xf.R.col2.x) * drawScale, (xf.position.y + 1 * xf.R.col2.y) * drawScale);
      s.closePath();
      s.stroke();
	}
	public function drawSegment(p1:B2Vec2, p2:B2Vec2, color:B2Color, drawScale : Float) {
		var s = canvas.graphics;
      //s.strokeStyle = color.color;
      s.beginPath();
      s.moveTo(p1.x * drawScale, (p1.y)* drawScale);
      s.lineTo(p2.x * drawScale, (p2.y) * drawScale);
      s.closePath();
      s.stroke();
	}
	public function drawSolidCircle(center:B2Vec2, radius:Float, axis:B2Vec2, color:B2Color, drawScale : Float) {
		//var s = canvas.graphics;
		 //var cx = center.x * drawScale;
      //var cy = center.y * drawScale;
      //s.moveTo(0, 0);
      //s.beginPath();
      //s.strokeStyle = color.color;
      //s.fillStyle = color.color;
      //s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
      //s.moveTo(cx, cy);
      //s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
      //s.closePath();
      //s.fill();
      //s.stroke();
	}
	public function drawCircle(center : B2Vec2, radius : Float, color : B2Color, drawScale : Float) {
		var s = canvas.graphics;
		s.beginPath();
	  //s.strokeStyle = color.color;
      s.arc(center.x * drawScale, (center.y) * drawScale, radius * drawScale, 0, Math.PI * 2, true);
      s.closePath();
      s.stroke();
		
	}
	public function drawSolidPolygon(vertices:Array < B2Vec2 > , vertexCount : Int , color : B2Color, drawScale : Float) {
		//var s = canvas.graphics;
		//s.beginPath();
		  //s.strokeStyle = color.color;
		  //s.fillStyle = color.color;
		  //s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
		  //for (i in 1...vertexCount) {
			 //s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
		  //}
		  //s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
		  //s.closePath();
		  //s.fill();
		  //s.stroke();
	}
	
	
	public function drawPolygon(vertices:Array < B2Vec2 > , vertexCount : Int , color : B2Color, drawScale : Float) {
        var s = canvas.graphics;
        s.beginPath();
        //s.strokeStyle = color.color;
        s.moveTo(vertices[0].x * drawScale, (vertices[0].y) * drawScale);
        for (i in 1...vertexCount) {
           s.lineTo(vertices[i].x * drawScale, (vertices[i].y) * drawScale);
        }
        s.lineTo(vertices[0].x * drawScale, (vertices[0].y) * drawScale);
        s.closePath();
        s.stroke();
	}
	
	public var translateX : Float = 0;
	public function clear() {
		canvas.graphics.clear(new Rectangle(-translateX - B2DebugSprite.OFFSET_X, -B2DebugSprite.OFFSET_Y, B2DebugSprite.TEXTURE_WIDTH, B2DebugSprite.TEXTURE_HEIGHT));
	}
	#end
}