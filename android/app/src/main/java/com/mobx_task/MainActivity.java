package com.mobx_task;

import android.content.Intent;

import com.facebook.react.ReactActivity;

import io.branch.referral.Branch;

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
        Branch.getInstance().initSession(branchReferralInitListener, getIntent() != null ?
                getIntent().getData() : null, this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        Branch.getInstance().reInitSession(this, branchReferralInitListener);
    }

    public Branch.BranchReferralInitListener branchReferralInitListener =
            (referringParams, error) -> {

            };
}
