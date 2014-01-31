package urgame;
import box2D.dynamics.B2Body;
import dev.tilemap.TMXObject;
import flambe.Component;
import box2D.dynamics.B2BodyDef;
import box2D.collision.shapes.B2CircleShape;
import box2D.dynamics.B2FixtureDef;
import flambe.display.ImageSprite;
import flambe.Entity;
/**
 * ...
 * @author ...
 */
class Coin extends Component
{
	var body : B2Body;
	var image : ImageSprite;
	var root : Entity;
	public var remove : Bool = false;
	public function new(o : TMXObject) 
	{
		var bodyDef : B2BodyDef = new B2BodyDef();
		bodyDef.type = B2Body.b2_staticBody;
		bodyDef.position.set((o.x + o.width / 2) / GameLayer.PTM, (o.y + o.height / 2)/ GameLayer.PTM);
		
		body = GameLayer.world.createBody(bodyDef);
		body.name = "coin";
		var shape : B2CircleShape  = new B2CircleShape();
		shape.setRadius(o.width / 2 / GameLayer.PTM);
		
		var fixtureDef : B2FixtureDef = new B2FixtureDef();
		fixtureDef.shape = shape;
		body.createFixture(fixtureDef);
		
		image = new ImageSprite(Pack.pack.getTexture("test/coin"));
		image.setXY(o.x, o.y);
		
		body.setUserData(this);
	}
	
	override public function onAdded() 
	{
		owner.add(image);
	}
	
	
	override public function onRemoved() 
	{
		owner.dispose();
		body.getWorld().destroyBody(body);
	}
	
	override public function onUpdate(dt:Float) 
	{
		if (remove) {
			this.dispose();
		}
	}
}