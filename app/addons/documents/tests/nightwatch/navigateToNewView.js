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

  // this tests that the user is able to just navigate to and from the New View page without errors [it confirms
  // a bug fix for where the Ace Editor threw a JS error preventing the subsequent page from loading]
  'Navigate to and from New View Page' : function (client) {
    var waitTime = 10000,
      newDatabaseName = client.globals.testDatabaseName,
      baseUrl = client.globals.test_settings.launch_url;

    client
      .loginToGUI()
      .url(baseUrl + '/#/database/' + newDatabaseName + '/_all_docs')
      .waitForElementPresent('#new-all-docs-button', waitTime, false)
      .click('#new-all-docs-button')
      .waitForElementPresent('#new-all-docs-button a[href="#/database/' + newDatabaseName + '/new_view"]', waitTime, false)
      .click('#new-all-docs-button a[href="#/database/' + newDatabaseName + '/new_view"]')
      .waitForElementPresent('#define-view', waitTime, false)
      .verify.urlEquals(baseUrl+'/#/database/' + newDatabaseName + '/new_view')

      // now redirect back to the database page and check it's loaded properly
      .click('#nav-links a[href="#/_all_dbs"]')
      .waitForElementPresent('#dashboard-content .databases', waitTime, false);
  }
};
