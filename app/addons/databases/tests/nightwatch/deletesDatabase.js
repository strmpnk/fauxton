// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

module.exports = {
  'Deletes a database': function (client) {
    var waitTime = 8000,
        newDatabaseName = client.globals.testDatabaseName,
        baseUrl = client.globals.test_settings.launch_url;

    client
      .loginToGUI()
      .url(baseUrl+'/#/database/'+newDatabaseName+'/_all_docs')
      .waitForElementPresent('#header-dropdown-menu a.dropdown-toggle.icon.fonticon-cog', waitTime, false)
      .click("#header-dropdown-menu a.dropdown-toggle.icon.fonticon-cog")
      .waitForElementPresent('#header-dropdown-menu .fonticon-trash', waitTime, false)
      .click('#header-dropdown-menu .fonticon-trash')
      .waitForElementVisible('#db_name', waitTime, false)
      .click('#db_name')
      .setValue('input#db_name', [newDatabaseName, client.Keys.ENTER] )
      .waitForElementVisible('#global-notifications .alert.alert-info', waitTime, false)
      .url(baseUrl+'/_all_dbs')
      .waitForElementPresent('pre',waitTime, false)
      .getText('body', function (result) {
        var data = result.value, 
            createdDatabaseIsNotPresent = data.indexOf(newDatabaseName);

        this.verify.ok(createdDatabaseIsNotPresent === -1,
          'Checking if new database no longer shows up in _all_dbs.');
      })
    .end();
  }
};
