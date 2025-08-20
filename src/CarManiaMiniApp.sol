// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CarMania Mini App Smart Contract
 * @dev Owned by CarCulture company for cross-platform car culture engagement
 * @dev Tracks user engagement with PUBLIC data only (Title, VEHICLE_COLOR, VEHICLE_TYPE)
 * @dev PRIVATE data (VEHICLE_MAKE, VEHICLE_MODEL, VEHICLE_PARTS, etc.) never exposed
 * @dev CarCulture company maintains full ownership and control
 */
contract CarManiaMiniApp is Ownable, ReentrancyGuard {
    // PUBLIC DATA TRACKING (Your exact database format - Safe to expose)
    mapping(string => uint256) public titleEngagement;        // "Fin Friday", "Light Bulb Moment"
    mapping(string => uint256) public VEHICLE_COLOR_Engagement; // "RED", "BLUE", "CHROME"
    mapping(string => uint256) public VEHICLE_TYPE_Engagement;  // "CONVERTIBLE", "COUPE", "SEDAN"
    
    // USER ENGAGEMENT TRACKING (Generic patterns only)
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public userTotalEngagement;
    mapping(address => mapping(string => uint256)) public userTitleEngagement;
    mapping(address => mapping(string => uint256)) public userVEHICLE_COLOR_Engagement;
    mapping(address => mapping(string => uint256)) public userVEHICLE_TYPE_Engagement;
    
    // PLATFORM ENGAGEMENT (Safe to track)
    mapping(string => uint256) public platformEngagement;
    mapping(address => mapping(string => uint256)) public userPlatformEngagement;
    
    // Events for notifications (PUBLIC DATA ONLY - Your database format)
    event CarViewed(address indexed user, string title, string VEHICLE_COLOR, string VEHICLE_TYPE, string platform, uint256 timestamp);
    event PointsEarned(address indexed user, uint256 points, string reason);
    event UserLevelUp(address indexed user, uint256 newLevel, string reason);
    
    /**
     * @dev Constructor - CarCulture company deploys and owns this contract
     * @dev CarCulture maintains full control over all admin functions
     */
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Record user engagement with PUBLIC data only
     * @dev Matches your exact database field names: Title, VEHICLE_COLOR, VEHICLE_TYPE
     * @dev PRIVATE data (VEHICLE_MAKE, VEHICLE_MODEL, VEHICLE_PARTS, etc.) never exposed
     * @param title - Artwork title from Title field (e.g., "Fin Friday", "Light Bulb Moment")
     * @param VEHICLE_COLOR - Color from VEHICLE_COLOR field (e.g., "RED", "BLUE", "CHROME")
     * @param VEHICLE_TYPE - Type from VEHICLE_TYPE field (e.g., "CONVERTIBLE", "COUPE", "SEDAN")
     * @param platform - Platform where interaction occurred (e.g., "farcaster", "telegram", "x")
     */
    function recordCarView(
        string memory title,      // "Fin Friday" (from Title field)
        string memory VEHICLE_COLOR, // "RED", "BLUE", "CHROME" (from VEHICLE_COLOR field)
        string memory VEHICLE_TYPE,  // "CONVERTIBLE", "COUPE" (from VEHICLE_TYPE field)
        string memory platform    // "farcaster", "telegram", "x"
    ) external nonReentrant {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(VEHICLE_COLOR).length > 0, "VEHICLE_COLOR cannot be empty");
        require(bytes(VEHICLE_TYPE).length > 0, "VEHICLE_TYPE cannot be empty");
        require(bytes(platform).length > 0, "Platform cannot be empty");
        
        // Update PUBLIC engagement tracking with your exact database values
        titleEngagement[title] += 1;
        VEHICLE_COLOR_Engagement[VEHICLE_COLOR] += 1;        // "RED", "BLUE", "CHROME"
        VEHICLE_TYPE_Engagement[VEHICLE_TYPE] += 1;          // "CONVERTIBLE", "COUPE"
        
        // Update user engagement (PUBLIC DATA ONLY)
        userPoints[msg.sender] += 5; // 5 points per car view
        userTotalEngagement[msg.sender] += 1;
        userTitleEngagement[msg.sender][title] += 1;
        userVEHICLE_COLOR_Engagement[msg.sender][VEHICLE_COLOR] += 1;
        userVEHICLE_TYPE_Engagement[msg.sender][VEHICLE_TYPE] += 1;
        
        // Update platform stats (safe to track)
        platformEngagement[platform] += 1;
        userPlatformEngagement[msg.sender][platform] += 1;
        
        // Check for level up
        uint256 newLevel = userPoints[msg.sender] / 100;
        uint256 currentLevel = getUserLevel(msg.sender);
        if (newLevel > currentLevel) {
            emit UserLevelUp(msg.sender, newLevel, "Points milestone reached!");
        }
        
        // Emit events with your exact database format
        emit CarViewed(msg.sender, title, VEHICLE_COLOR, VEHICLE_TYPE, platform, block.timestamp);
        emit PointsEarned(msg.sender, 5, "Car view");
    }
    
    /**
     * @dev Get user statistics (PUBLIC DATA ONLY)
     * @param user - User address to query
     * @return points - User's total points
     * @return totalEngagement - User's total engagement count
     * @return level - User's current level
     */
    function getUserStats(address user) external view returns (
        uint256 points,
        uint256 totalEngagement,
        uint256 level
    ) {
        points = userPoints[user];
        totalEngagement = userTotalEngagement[user];
        level = getUserLevel(user);
    }
    
    /**
     * @dev Get user level based on points
     * @param user - User address to query
     * @return User's current level (1 level per 100 points)
     */
    function getUserLevel(address user) public view returns (uint256) {
        return userPoints[user] / 100;
    }
    
    /**
     * @dev Get platform engagement statistics
     * @param platform - Platform to query (e.g., "farcaster", "telegram", "x")
     * @return Total engagement count for the platform
     */
    function getPlatformStats(string memory platform) external view returns (uint256) {
        return platformEngagement[platform];
    }
    
    /**
     * @dev Get PUBLIC engagement stats (Your exact database format)
     * @dev These functions only expose PUBLIC data (Title, VEHICLE_COLOR, VEHICLE_TYPE)
     * @dev PRIVATE data (VEHICLE_MAKE, VEHICLE_MODEL, VEHICLE_PARTS, etc.) never accessible
     */
    
    /**
     * @dev Get engagement count for specific title
     * @param title - Artwork title from Title field
     * @return Engagement count for the title
     */
    function getTitleEngagement(string memory title) external view returns (uint256) {
        return titleEngagement[title];
    }
    
    /**
     * @dev Get engagement count for specific VEHICLE_COLOR
     * @param VEHICLE_COLOR - Color from VEHICLE_COLOR field
     * @return Engagement count for the color
     */
    function getVEHICLE_COLOR_Engagement(string memory VEHICLE_COLOR) external view returns (uint256) {
        return VEHICLE_COLOR_Engagement[VEHICLE_COLOR];
    }
    
    /**
     * @dev Get engagement count for specific VEHICLE_TYPE
     * @param VEHICLE_TYPE - Type from VEHICLE_TYPE field
     * @return Engagement count for the vehicle type
     */
    function getVEHICLE_TYPE_Engagement(string memory VEHICLE_TYPE) external view returns (uint256) {
        return VEHICLE_TYPE_Engagement[VEHICLE_TYPE];
    }
    
    /**
     * @dev Admin function: Add bonus points (CarCulture company only)
     * @dev Only the CarCulture company wallet can call this function
     * @param user - User to award points to
     * @param points - Points to award
     * @param reason - Reason for awarding points
     */
    function addBonusPoints(address user, uint256 points, string memory reason) external onlyOwner {
        userPoints[user] += points;
        emit PointsEarned(user, points, reason);
    }
}
