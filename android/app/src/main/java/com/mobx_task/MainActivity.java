package com.mobx_task;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

import org.json.JSONObject;
import io.branch.indexing.BranchUniversalObject;
import io.branch.referral.Branch;
import io.branch.referral.BranchError;
import io.branch.referral.util.LinkProperties;

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
            new Branch.BranchReferralInitListener() {
                @Override
                public void onInitFinished(@Nullable JSONObject referringParams, @Nullable BranchError error) {

                }
    };
}
