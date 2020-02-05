package com.mobx_task;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.ReactActivity;

import org.json.JSONObject;

import io.branch.referral.Branch;
import io.branch.referral.BranchError;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "mobX_task";
  }

  @Override
  public void onStart() {
      super.onStart();
      Branch branch = Branch.getInstance();

      // Branch init
      branch.initSession(new Branch.BranchReferralInitListener() {
          @Override
          public void onInitFinished(JSONObject referringParams, BranchError error) {
              if (error == null) {
                  // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
                  // params will be empty if no data found
                  // ... insert custom logic here ...
                  Log.i("BRANCH SDK", referringParams.toString());
              } else {
                  Log.i("BRANCH SDK", error.getMessage());
              }
          }
      }, this.getIntent().getData(), this);
  }

  @Override
  public void onNewIntent(Intent intent) {
      this.setIntent(intent);
  }

}
