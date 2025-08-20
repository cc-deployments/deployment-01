// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/CarManiaMiniApp.sol";

contract CarManiaMiniAppTest is Test {
    CarManiaMiniApp public carManiaContract;
    address public user = address(1);
    address public owner = address(2);
    
    function setUp() public {
        carManiaContract = new CarManiaMiniApp();
        vm.label(user, "User");
        vm.label(owner, "Owner");
    }
    
    function testRecordCarView() public {
        vm.startPrank(user);
        
        carManiaContract.recordCarView("Fin Friday", "RED", "CONVERTIBLE", "farcaster");
        
        (uint256 points, uint256 views, uint256 level) = carManiaContract.getUserStats(user);
        assertEq(points, 5);
        assertEq(views, 1);
        assertEq(level, 0);
        
        vm.stopPrank();
    }
    
    function testLevelUp() public {
        vm.startPrank(user);
        
        // Record 20 car views to get 100 points (level 1)
        for (uint i = 0; i < 20; i++) {
            carManiaContract.recordCarView("Test Car", "BLUE", "COUPE", "farcaster");
        }
        
        (,, uint256 level) = carManiaContract.getUserStats(user);
        assertEq(level, 1);
        
        vm.stopPrank();
    }
    
    function testPlatformStats() public {
        vm.startPrank(user);
        
        carManiaContract.recordCarView("Test Car", "RED", "CONVERTIBLE", "farcaster");
        carManiaContract.recordCarView("Test Car 2", "BLUE", "COUPE", "telegram");
        
        assertEq(carManiaContract.getPlatformStats("farcaster"), 1);
        assertEq(carManiaContract.getPlatformStats("telegram"), 1);
        
        vm.stopPrank();
    }
    
    function testTitleEngagement() public {
        vm.startPrank(user);
        
        carManiaContract.recordCarView("Fin Friday", "RED", "CONVERTIBLE", "farcaster");
        carManiaContract.recordCarView("Fin Friday", "BLUE", "CONVERTIBLE", "telegram");
        
        assertEq(carManiaContract.getTitleEngagement("Fin Friday"), 2);
        
        vm.stopPrank();
    }
    
    function testVehicleColorEngagement() public {
        vm.startPrank(user);
        
        carManiaContract.recordCarView("Test Car", "RED", "CONVERTIBLE", "farcaster");
        carManiaContract.recordCarView("Test Car 2", "RED", "COUPE", "telegram");
        
        assertEq(carManiaContract.getVEHICLE_COLOR_Engagement("RED"), 2);
        
        vm.stopPrank();
    }
    
    function testVehicleTypeEngagement() public {
        vm.startPrank(user);
        
        carManiaContract.recordCarView("Test Car", "RED", "CONVERTIBLE", "farcaster");
        carManiaContract.recordCarView("Test Car 2", "BLUE", "CONVERTIBLE", "telegram");
        
        assertEq(carManiaContract.getVEHICLE_TYPE_Engagement("CONVERTIBLE"), 2);
        
        vm.stopPrank();
    }
    
    function testAdminBonusPoints() public {
        vm.startPrank(owner);
        
        carManiaContract.addBonusPoints(user, 50, "Special achievement");
        
        (uint256 points,,) = carManiaContract.getUserStats(user);
        assertEq(points, 50);
        
        vm.stopPrank();
    }
    
    function testOnlyOwnerCanAddBonusPoints() public {
        vm.startPrank(user);
        
        vm.expectRevert("Ownable: caller is not the owner");
        carManiaContract.addBonusPoints(user, 50, "Should fail");
        
        vm.stopPrank();
    }
    
    function testEmptyStringsRejected() public {
        vm.startPrank(user);
        
        vm.expectRevert("Title cannot be empty");
        carManiaContract.recordCarView("", "RED", "CONVERTIBLE", "farcaster");
        
        vm.expectRevert("VEHICLE_COLOR cannot be empty");
        carManiaContract.recordCarView("Fin Friday", "", "CONVERTIBLE", "farcaster");
        
        vm.expectRevert("VEHICLE_TYPE cannot be empty");
        carManiaContract.recordCarView("Fin Friday", "RED", "", "farcaster");
        
        vm.expectRevert("Platform cannot be empty");
        carManiaContract.recordCarView("Fin Friday", "RED", "CONVERTIBLE", "");
        
        vm.stopPrank();
    }
}
