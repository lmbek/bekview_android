#include <jni.h>
//#include "native.h"
#include "libGo.h"

extern GoInt GoInteger();
extern void Run();

jint Java_beksoft_project_bekview_MainActivity_integerTest(JNIEnv *env, jclass clazz) {
    return GoInteger();
}

void Java_beksoft_project_bekview_MainActivity_run(JNIEnv *env, jclass clazz) {
    Run();
}


/*
#include <jni.h>

extern char *goHelloWorld();
extern int goInteger();

jstring Java_beksoft_project_bekview_MainActivity_stringFromJNI(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, goHelloWorld());
}

jint Java_beksoft_project_bekview_MainActivity_integerFromJNI(JNIEnv *env, jobject thiz) {
    return goInteger();
}
*/