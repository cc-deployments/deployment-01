// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

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
    
    constructor() Ownable(msg.sender) {}
    
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
    
    function getUserStats(address user) external view returns (
        uint256 points,
        uint256 totalEngagement,
        uint256 level
    ) {
        points = userPoints[user];
        totalEngagement = userTotalEngagement[user];
        level = getUserLevel(user);
    }
    
    function getUserLevel(address user) public view returns (uint256) {
        return userPoints[user] / 100;
    }
    
    function getPlatformStats(string memory platform) external view returns (uint256) {
        return platformEngagement[platform];
    }
    
    function getTitleEngagement(string memory title) external view returns (uint256) {
        return titleEngagement[title];
    }
    
    function getVEHICLE_COLOR_Engagement(string memory VEHICLE_COLOR) external view returns (uint256) {
        return VEHICLE_COLOR_Engagement[VEHICLE_COLOR];
    }
    
    function getVEHICLE_TYPE_Engagement(string memory VEHICLE_TYPE) external view returns (uint256) {
        return VEHICLE_TYPE_Engagement[VEHICLE_TYPE];
    }
    
    function addBonusPoints(address user, uint256 points, string memory reason) external onlyOwner {
        userPoints[user] += points;
        emit PointsEarned(user, points, reason);
    }
}
