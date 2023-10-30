package main

import "C"
import (
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
)


// possible ideas for logging could be: "github.com/codahale/logops"

//export GoInteger
func GoInteger() int {
    fmt.Println("test")
    println("What!?")
    number1 := 5
    number2 := 109

    return number1+number2-2
}
//export Run
func Run() {
    //ListCurrentDirectory()

    println("Starting webserver...")
    go runWebserver()
}
func createIndexFile() {
	content := `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>
    body {
        margin:0;
        display: grid;
        justify-content: center;
        align-content: center;
        text-align: center;
        background: lightblue;
        font-size: 1.65rem;
        padding: 10px;
        min-height: 100%;
    }
</style>
<script>
window.setTimeout(()=>{
    alert("Velkommen til Bekview Android!")
},1000);

</script>
</head>
<body>
    The Go server is running! 1<br>
    The Go server is running! 2<br>
    The Go server is running! 3<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running! 4<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running! 5<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
    The Go server is running!<br>
</body>
</html>
`
    dir := "/data/data/beksoft.project.bekview/files"  // Adjust with your app's package name
    file, err := os.Create(dir + "/index.html")
    if err != nil {
        println("create file error")
    }
    defer file.Close()

    file.WriteString(content)
}


func handler(w http.ResponseWriter, r *http.Request) {
    createIndexFile()
	data, err := ioutil.ReadFile("/data/data/beksoft.project.bekview/files/index.html")
	if err != nil {
		http.Error(w, "Could not read index.html", http.StatusInternalServerError)
		return
	}
	w.Write(data)
}

func runWebserver() {
	http.HandleFunc("/", handler)
	http.ListenAndServe("127.0.0.1:8080", nil)
}


// ListCurrentDirectory lists the contents of the directory the script is inside.
//func ListCurrentDirectory() {
//    files, err := ioutil.ReadDir("/data/data/beksoft.project.bekview/files")
//    if err != nil {
//        log.Fatal(err)
//    }
//
//    for _, file := range files {
//        fmt.Println(file.Name())
//    }
//}


func main() {}