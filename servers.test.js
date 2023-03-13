describe("Servers test (with setup and tear-down)", function() {
  let serverNameInput, allServers;

  beforeEach(function() {
    serverNameInput = document.createElement('input');
    serverNameInput.setAttribute('id', 'serverName');
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });
  
  it('should not add a server if serverName input is empty', function() {
    serverNameInput.value = '';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });

  afterEach(function() {
    serverNameInput.value = '';
    allServers = {};
  });
});

describe("updateServerTable()", function() {
  beforeEach(function () {
    // Set up a test server in allServers
    allServers = {
      server1: { serverName: "TestServer", serverTps: 5 }
    };

    // Clear out the table rows
    serverTbody.innerHTML = '';
  });

  it("should update the table with the server's name and tip per sale", function() {
    // Call the function being tested
    updateServerTable();

    // Check that the table row was added
    expect(serverTbody.children.length).toEqual(1);

    // Check that the table row displays the correct information
    expect(serverTbody.children[0].childNodes[0].innerText).toEqual("TestServer");
    expect(serverTbody.children[0].childNodes[1].innerText).toEqual("$0.00");
  });

  afterEach(function() {
    // Reset allServers to an empty object
    allServers = {};

    // Clear out the table rows
    serverTbody.innerHTML = '';
  });
});

