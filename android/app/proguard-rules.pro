# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# --- BusBus ---
# R8 ligado sem ofuscação: nomes de classes e métodos continuam legíveis,
# o que mantém os stack traces claros e evita quebrar a reflexão do Capacitor.
-dontobfuscate

# O Capacitor localiza plugins e métodos expostos ao JavaScript por reflexão
# e anotações; sem isso o R8 pode remover o que o WebView chama.
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod public *;
    @android.webkit.JavascriptInterface public *;
}
-dontwarn com.getcapacitor.**

# MainActivity é referenciada pelo AndroidManifest.
-keep class com.busbus.app.MainActivity { *; }
