pragma solidity ^0.8.0;

contract Shivom {
    struct GenomicData {
        uint256 id;
        string dataHash;
        address owner;
        bool isPublic;
    }
    
    GenomicData[] public genomicDataList;
    uint256 public dataCount = 0;

    function addData(string memory _dataHash, bool _isPublic) public {
        genomicDataList.push(GenomicData(dataCount, _dataHash, msg.sender, _isPublic));
        dataCount++;
    }
    
    function getDataById(uint256 _id) public view returns (uint256, string memory, address, bool) {
        require(_id < dataCount, "Invalid ID");
        GenomicData memory data = genomicDataList[_id];
        return (data.id, data.dataHash, data.owner, data.isPublic);
    }
    
    function getDataCount() public view returns (uint256) {
        return dataCount;
    }
    
    function updateData(uint256 _id, string memory _dataHash, bool _isPublic) public {
        require(_id < dataCount, "Invalid ID");
        GenomicData storage data = genomicDataList[_id];
        require(data.owner == msg.sender, "You are not the owner of this data");
        data.dataHash = _dataHash;
        data.isPublic = _isPublic;
    }
    
    function deleteData(uint256 _id) public {
        require(_id < dataCount, "Invalid ID");
        GenomicData storage data = genomicDataList[_id];
        require(data.owner == msg.sender, "You are not the owner of this data");
        delete genomicDataList[_id];
        dataCount--;
    }
}
