package urgame;
import box2D.collision.shapes.B2CircleShape;
import box2D.collision.shapes.B2PolygonShape;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2BodyDef;
import box2D.dynamics.B2DebugDraw;
import box2D.dynamics.B2DebugSprite;
import box2D.dynamics.B2FixtureDef;
import box2D.dynamics.B2World;
import box2D.dynamics.B2Body;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.input.KeyboardEvent;
import flambe.math.Point;



import dev.tilemap.TMXObjectGroup;
import dev.tilemap.TMXTiledMap;
import flambe.Component;
import flambe.Disposer;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.SpeedAdjuster;
import flambe.System;
import format.swf.Data.Morph2LineStyleData;


#if flash
import flash.display.Sprite;
import flash.Lib;
#end
/**
 * ...
 * @author ...
 */
class GameLayer extends Component
{
	public var map : TMXTiledMap;
	public var player : Player;
	var _disposer : Disposer;
	public static var world : B2World;
	public static var PTM : Float = 30;
	public static var GAME_WIDTH : Float;
	public static var GAME_HEIGHT : Float;
	
	var isDebug : Bool = false;
	var mapSprite : flambe.display.Sprite;
	
	//Debug
	var debugDraw : B2DebugDraw;
	var debugSprite : ImageSprite;
	var tmpX : Float = 0;
	var tmpY : Float = 0;
	
	var coinLayer : Entity;
	var crateLayer : Entity;
	var coins : Array<Coin>;
	var crates : Array<Crate>;
	public function new() 
	{
		map = new TMXTiledMap(Pack.pack, "test/glitch.tmx", "test");
		world = new B2World(new B2Vec2(0, 9.8), true);
		
		initPlatform();
		initPlayer();
		initGround();
		initCoin();
		initCrate();
		
		if (isDebug) {
			debugDraw =  new B2DebugDraw();
			debugDraw.setDrawScale (PTM);
			debugDraw.setFlags (B2DebugDraw.e_shapeBit);
			#if js
				
				var ds : B2DebugSprite = new B2DebugSprite();
				debugSprite = new ImageSprite(ds.canvas);
				debugDraw.setSprite(ds);
				world.setDebugDraw(debugDraw);
			#elseif flash
				var ds : flash.display.Sprite = new flash.display.Sprite();
			    debugDraw.setSprite(ds);
				world.setDebugDraw(debugDraw);
			#end
		}
		
		
		world.setContactListener(new ContactListener());
		tmpY = GAME_HEIGHT;
		
	}
	
	override public function onAdded() 
	{
		_disposer = new Disposer();
		owner.add(_disposer);
		
		_disposer.connect1(System.pointer.up, handlePointerUp);
		_disposer.connect1(System.pointer.down, handlePointerDown);
		
		
		
		owner.addChild(map.getRoot());
		
		owner.addChild(new Entity().add(player));
		
		
		if (isDebug) {
			#if js
			owner.addChild(new Entity().add(debugSprite));
			#elseif flash
			Lib.current.addChild(debugDraw.getSprite());
			#end
		}
		
		owner.add(this.mapSprite = new flambe.display.Sprite());
		//mapSprite.x._ -= tmpX;
		//mapSprite.y._ -= 600;
		//tmpY += 600;
		
		owner.addChild(coinLayer);
		owner.addChild(crateLayer);
	}
	
	public function handlePointerUp(event : PointerEvent) {
		player.stop();
	}
	
	public function handlePointerDown(event : PointerEvent) {
		
		if (event.viewY / Params.AUTO_SCALE < GAME_HEIGHT / 2) {
			player.jump();
		} else {
			if (event.viewX / Params.AUTO_SCALE < GAME_WIDTH / 2) {
				player.dir = Direction.Left;
			} else {
				player.dir = Direction.Right;
			}
			
			player.walk();
		}
	}

	public function initPlatform() {
		var platforms : TMXObjectGroup = map.getObjectGroup("Platform");
		for (p in platforms.getObjects()) {
			var bodyDef : B2BodyDef = new B2BodyDef();
			bodyDef.type = B2Body.b2_staticBody;
			bodyDef.position.set((p.x + p.width / 2) / PTM, (p.y)/ PTM);
			
			var body : B2Body = world.createBody(bodyDef);
			body.name = "platform";
			//if (p.name == "p3") {
				//body.name = "platformp3";
			//}
			var shape : B2PolygonShape = new B2PolygonShape();
			shape.setAsEdge(new B2Vec2(-p.width / 2 / PTM, 0), new B2Vec2(p.width / 2 / PTM));
			//shape.setAsBox((p.width / 2) / PTM, (p.height / 2) / PTM);
			
			var fixtureDef : B2FixtureDef = new B2FixtureDef();
			fixtureDef.shape = shape;
			body.createFixture(fixtureDef);
		}
	}
	
	public function initPlayer() {
		player = new Player(this);
		
		
	}
	
	public function initGround() {
		var ground : TMXObjectGroup = map.getObjectGroup("Ground");
		
		for (o in ground.getObjects()) {
			if (!o.isPolyline) {
				continue;
			}
			
			var startingPoint : Point = new Point(o.x / PTM, o.y / PTM);
			for (i in 0...o.vertexs.length - 1) {
				
				var bodyDef : B2BodyDef = new B2BodyDef();
				bodyDef.type = B2Body.b2_staticBody;
				var p1x = o.vertexs[i].x / PTM + startingPoint.x;
				var p1y = o.vertexs[i].y / PTM + startingPoint.y;
				var p2x = o.vertexs[i + 1].x / PTM + startingPoint.x;
				var p2y = o.vertexs[i + 1].y / PTM + startingPoint.y;
				bodyDef.position.set((p1x + p2x) / 2, (p1y + p2y) / 2);
				
				var shape : B2PolygonShape = new B2PolygonShape();
				shape.setAsEdge(new B2Vec2((p1x - p2x) / 2, (p1y - p2y) / 2), new B2Vec2((p2x - p1x) / 2, (p2y - p1y) / 2));
				
				var fixtureDef : B2FixtureDef = new B2FixtureDef();
				fixtureDef.shape = shape;
				
				var body : B2Body = world.createBody(bodyDef);
				body.name = "ground";
				body.createFixture(fixtureDef);
			}

			
		}
	}
	
	public function initCoin() {
		coinLayer = new Entity();
		var coins : TMXObjectGroup = map.getObjectGroup("Coin");
		
		for (o in coins.getObjects()) {
			if (!o.isCircle) {
				continue;
			}

			var c : Coin = new Coin(o);
			coinLayer.addChild(new Entity().add(c));
		}
	}
	
	public function initCrate() {
		crateLayer = new Entity();
		var crates : TMXObjectGroup = map.getObjectGroup("Crate");
		
		for (c in crates.getObjects()) {
			var crate : Crate = new Crate(c);
			crateLayer.addChild(new Entity().add(crate));
		}
	}
	override public function onUpdate(dt:Float) 
	{
		world.step(1 / 60, 10, 6);
		world.clearForces();
		
		if (isDebug) {
			#if js
			debugDraw.getSprite().clear();
			#end
			world.drawDebugData();
			
		}
		updateViewportX();
		//updateViewportY();
		
	}
	
	
	public function updateViewportX() {
		var diff = player.position.x - (tmpX + GAME_WIDTH / 3);
		if (diff > 0) {
			if (mapSprite.x._ <= -5000) {
				return;
			}
			tmpX += diff;
			mapSprite.x._ -= diff;
			return;
		}
		
		diff = player.position.x - (tmpX + GAME_WIDTH / 3);
		if (diff < 0) {
			if (mapSprite.x._ >= 0) {
				return;
			}
			tmpX += diff;
			mapSprite.x._ -= diff;
			return;
		}
	}
	
	
	public function updateViewportY() {
		var diff = player.position.y - (tmpY - GAME_HEIGHT / 2);
		//var playerY : Float = pos.y * -1 * PTM + HEIGHT;
		
		if (diff < 0) {
			tmpY += diff;
			mapSprite.y._ -= diff;
			return;
		}
		
		diff = player.position.y - (tmpY - (GAME_HEIGHT / 2));
		if (diff > 0) {
			tmpY  += diff;
			mapSprite.y._ -= diff;
			return;
		}
		
		
		return;
	}
}