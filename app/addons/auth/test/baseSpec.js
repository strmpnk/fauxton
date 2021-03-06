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
define([
      'api',
      'addons/auth/base',
      'core/auth',
      'testUtils'
], function (FauxtonAPI, Base, Auth, testUtils) {
  var assert = testUtils.assert,
      ViewSandbox = testUtils.ViewSandbox;

  describe("Auth: Login", function () {

    describe("failed login", function () {

      it("redirects with replace: true set", function () {
        var navigateSpy = sinon.spy(FauxtonAPI, 'navigate');
        FauxtonAPI.auth = new Auth();
        FauxtonAPI.session.isLoggedIn = function () { return false; };
        Base.initialize();
        FauxtonAPI.auth.authDeniedCb();
        assert.ok(navigateSpy.withArgs('/login?urlback=', {replace: true}).calledOnce);
      });
    });
  });
});
