package urgame;
import box2D.dynamics.B2ContactListener;
import box2D.collision.B2Manifold;
import box2D.collision.B2WorldManifold;
import box2D.common.math.B2Vec2;
import box2D.dynamics.B2Body;
import box2D.dynamics.B2ContactImpulse;
import box2D.dynamics.B2ContactListener;
import box2D.dynamics.B2Fixture;
import box2D.dynamics.contacts.B2Contact;

/**
 * ...
 * @author ...
 */
class ContactListener extends B2ContactListener
{

	//var isCollision : Bool = false;
	//var player : B2Body;
	//
	//var level : Level;
	public function new() 
	{
		super();
		//this.level = level;
	}
	
	override public function preSolve(contact:B2Contact, oldManifold:B2Manifold):Void 
	{
		if (touchPlatform(contact)) {
			return;
		}
		
		
		
	}
	
	
	override public function beginContact(contact:B2Contact):Void 
	{
		getCoin(contact);
		
		var fixtureA : B2Fixture = contact.getFixtureA();
		var fixtureB : B2Fixture = contact.getFixtureB();
		
		var playerBody : B2Body = null;
		var goundBody : B2Body;
		if (fixtureA.getBody().name.indexOf("ground") != -1) {
			playerBody = fixtureB.getBody();
		} else if (fixtureB.getBody().name.indexOf("ground") != -1) {
			playerBody = fixtureA.getBody();
		}
		
		if (playerBody != null) {
			if (playerBody.name.indexOf("player") != -1) {
				playerBody.getUserData().status = Status.Idle;
				
			}
			
		}
	}
	override public function endContact(contact:B2Contact):Void 
	{
		//if (isCollision) {
			//
			//trace("collision");
			//isCollision = false;
		//}
		contact.setEnabled(true);
		if (pushCrate(contact)) return;
		
		
		//trace("endtouch");
		
		//var fixtureA : B2Fixture = contact.getFixtureA();
		//var fixtureB : B2Fixture = contact.getFixtureB();
		//
		//var platformFixture : B2Fixture = null;
		//var otherFixture : B2Fixture = null;
//
		//if (fixtureA.getBody().name.indexOf("platform") != -1) {
			//platformFixture = fixtureA;
			//otherFixture = fixtureB;
			//
		//} else if (fixtureB.getBody().name.indexOf("platform") != -1) {
			//platformFixture = fixtureB;
			//otherFixture = fixtureA;
			//
		//}
		//
		//if (platformFixture == null) {
			//return;
		//}
		//
		//otherFixture.getBody().getUserData().status = Status.Idle;
	}
	
	private function getCoin(contact:B2Contact) : Bool{
		var fixtureA : B2Fixture = contact.getFixtureA();
		var fixtureB : B2Fixture = contact.getFixtureB();
		
		var coinFixture : B2Fixture = null;
		var otherFixture : B2Fixture = null;

		if (fixtureA.getBody().name.indexOf("coin") != -1) {
			coinFixture = fixtureA;
			otherFixture = fixtureB;
			
		} else if (fixtureB.getBody().name.indexOf("coin") != -1) {
			coinFixture = fixtureB;
			otherFixture = fixtureA;
			
		}
		
		if (coinFixture == null) {
			return false;
		}
		
		if (otherFixture.getBody().name != "player") {
			return false;
		}
		
		contact.setEnabled(false);
		var coin : Coin = coinFixture.getBody().getUserData();
		coin.remove = true;
		return true;
	}
	
	private function touchPlatform(contact : B2Contact) : Bool {
		var fixtureA : B2Fixture = contact.getFixtureA();
		var fixtureB : B2Fixture = contact.getFixtureB();
		
		var platformFixture : B2Fixture = null;
		var otherFixture : B2Fixture = null;

		if (fixtureA.getBody().name.indexOf("platform") != -1) {
			platformFixture = fixtureA;
			otherFixture = fixtureB;
			
		} else if (fixtureB.getBody().name.indexOf("platform") != -1) {
			platformFixture = fixtureB;
			otherFixture = fixtureA;	
		}
		
		if (platformFixture == null) {
			return false;
		}
		
		if (otherFixture.getBody().name.indexOf("player") == -1) return false;
		
		var platformBody : B2Body = platformFixture.getBody();
		var otherBody : B2Body = otherFixture.getBody();
		
		var numPoints : Int = contact.getManifold().m_pointCount;
		var worldManifold : B2WorldManifold = new B2WorldManifold();
		contact.getWorldManifold(worldManifold);
		
		var otherY : Float = otherBody.getPosition().y * GameLayer.PTM + otherBody.getUserData().height / 2;
		var platformY : Float = platformBody.getPosition().y * GameLayer.PTM;
		  
		for (i in 0...numPoints) {
  
		  var pointVelPlatform =
			  platformBody.getLinearVelocityFromWorldPoint( worldManifold.m_points[i] );
		  var pointVelOther =
			  otherBody.getLinearVelocityFromWorldPoint( worldManifold.m_points[i] );
		  var relativeVel = platformBody.getLocalVector( new B2Vec2(pointVelOther.x - pointVelPlatform.x, pointVelPlatform.y - pointVelOther.y) );
		  
		  if (otherY <= platformY + 5) {
			  if (relativeVel.y < 0) {
				  otherBody.getUserData().status = Status.Idle;
				  return true;
			  }
		  }
		}
		contact.setEnabled(false);
		return false;
	}
	
	private function pushCrate(contact : B2Contact) : Bool {
		var fixtureA : B2Fixture = contact.getFixtureA();
		var fixtureB : B2Fixture = contact.getFixtureB();
		
		var crateFixture : B2Fixture = null;
		var playerFixture : B2Fixture = null;

		if (fixtureA.getBody().name.indexOf("crate") != -1) {
			crateFixture = fixtureA;
			playerFixture = fixtureB;
			
		} else if (fixtureB.getBody().name.indexOf("crate") != -1) {
			crateFixture = fixtureB;
			playerFixture = fixtureA;	
		}
		
		if (crateFixture == null) {
			return false;
		}
		
		if (playerFixture.getBody().name != "player") {
			return false;
		}
		//
		crateFixture.getBody().setLinearVelocity(new B2Vec2(0, crateFixture.getBody().getLinearVelocity().y));
		return false;
	}
}