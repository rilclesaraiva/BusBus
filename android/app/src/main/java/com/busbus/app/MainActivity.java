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
            // O CSS em styles.css já esconde a barra de rolagem "::-webkit-
            // scrollbar" do conteúdo HTML, mas isso não tem efeito nenhum
            // sobre a barra de rolagem NATIVA que o próprio Android WebView
            // desenha por cima (a faixa cinza que aparece e some sozinha,
            // mostrando em que ponto da página você está) — é uma camada
            // completamente separada do CSS, só desliga por aqui mesmo.
            getBridge().getWebView().setVerticalScrollBarEnabled(false);
            getBridge().getWebView().setHorizontalScrollBarEnabled(false);
        }
    }
}
