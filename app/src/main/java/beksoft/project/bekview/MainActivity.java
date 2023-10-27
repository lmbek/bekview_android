package beksoft.project.bekview;


import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    static {
        System.loadLibrary("native-lib-go");
        System.loadLibrary("native-lib");
    }

    public static native int integerTest();
    public static native void run();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // webview
        WebView webView = findViewById(R.id.webView);
        //webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());

        // Load the desired URL
        webView.loadUrl("http://127.0.0.1:8080");

        // calling Go
        System.out.println(integerTest());
        run();
    }


}