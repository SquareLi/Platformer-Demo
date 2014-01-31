package urgame;
import dev.math.Size;

/**
 * ...
 * @author Ang Li(李昂)
 */
class Params
{
	public static var NW : Int = 1;
	public static var NE : Int = 2;
	public static var SW : Int = 3;
	public static var SE : Int = 4;
	public static var N : Int = 5;
	public static var S : Int = 6;
	public static var E : Int = 7;
	public static var W : Int = 8;
	
	
	public static var DOOR : Int = 1;
	public static var NONE : Int = 0;
	public static var BLOCK : Int = -1;
	
	public static var PLAYER_VEC : Float = 5;
	
	public static var AUTO_SCALE : Float = 1;
	
	public static var SCORE : Int = 0;
	
	public static var PLAYER_ATTACK_SIZE : Size = new Size(40, 130);
	public static var PLAYER_BODY_SIZE : Size = new Size(50, 140);
	public static var PLAYER_ATTACK_VERTICAL_OFFSET : Float = 20;
	public static var PLAYER_ATTACK_HORIZONTAL_OFFSET : Float = 25;
	public static var PLAYER_ATTACK_DIAGONAL_OFFSET : Float = 10;
	
	public function new() 
	{
		
	}
	
}