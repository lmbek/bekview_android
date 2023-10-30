plugins {
    id("com.android.application")
}

android {
    namespace = "beksoft.project.bekview"
    compileSdk = 34

    lint {
        baseline = file("lint-baseline.xml")
    }

    defaultConfig {
        applicationId = "beksoft.project.bekview"
        minSdk = 29
        targetSdk = 31
        versionCode = 1
        versionName = "1.0"

        ndk {
            //abiFilters.add("x86_64") // For PC (runtime test)
            abiFilters.add("arm64-v8a") // For Android (runtime test)
        }
        //testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    externalNativeBuild {
        cmake {
            //path = file("src/main/c/CMakeLists.txt")
            path = file("src/main/jni/CMakeLists.txt")
            version = "3.22.1"
        }
    }
    buildFeatures {
        viewBinding = true
    }
    ndkVersion = "25.1.8937393"
    buildToolsVersion = "34.0.0"

}

dependencies {
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.10.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}