package com.busbus.app;

import android.os.Bundle;
import android.view.View;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Reforço nativo do "overscroll-behavior: none" do CSS (styles.css):
        // em algumas versões do WebView do sistema, o CSS sozinho não é
        // suficiente pra desligar o efeito "elástico"/esticado (stretch
        // overscroll, padrão desde o Android 12) ao puxar a tela além do
        // limite de rolagem — isso aqui desliga de vez, direto na origem.
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().setOverScrollMode(View.OVER_SCROLL_NEVER);
        }
    }
}
