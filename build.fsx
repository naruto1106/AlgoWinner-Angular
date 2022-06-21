// include Fake lib
#r @"packages\FAKE\tools\FakeLib.dll"
open System
open Fake
open Fake.AssemblyInfoFile
open Fake.OctoTools
open Fake.REST

let nugetPath = "nuget/NuGet.exe"

let amNugetServer = 
    match environVar "AppEnv" with
    | "DevBeta" -> "http://nuget.algomerchant.com"
    | _ -> "http://nuget.algomerchant.com"

trace ("AlgoMerchant Nuget Server is set to " + amNugetServer)

let RestorePackages() = 
    !! "src/*/packages.config"
    ++ "src/*/*/packages.config"
    ++ "src/*/*/*/packages.config"
    ++ "nuget/packages.config"    
    |> Seq.iter (RestorePackage (fun p ->
              { p with
                  ToolPath = nugetPath                   
                  }))

// Directories
let buildDir  = @".\build\"
let testDir   = @".\test\"
let deployDir = @".\deploy\"
let packagesDir = @".\packages"

let runE2ETest = false
let runJSTest=true
let runNUnitTest=true

// package version info
let version =
  match buildServer with
  | Jenkins -> buildVersion
  | _ -> "0.1.0.0-local"


// nuget publish option
let nugetpublish =
  match buildServer with
  | Jenkins -> true
  | _ -> false

// Targets
Target "Clean" (fun _ ->
    CleanDirs [buildDir; testDir; deployDir]
)
Target "RunGulp" (fun _ ->
    CleanDirs [@".\src\srcmap\"]

    let preRunGulpAwc = Shell.Exec("cmd", "/C yarn install", "./src/")
    if preRunGulpAwc <> 0 then failwith "Failed to install npm packages for AWC"
    let runGulp = Shell.Exec("cmd","/C set NODE_ENV=production&& set VERSION="+version+"&& %appdata%\\npm\\gulp","./src/")
    if runGulp <> 0 then failwith "Failed to run AWC gulp"
)

Target "RestorePackage" (fun _ -> 
    RestorePackages()
)

Target "JSTest" (fun _ -> 
    let errorCode = Shell.Exec("cmd", "/C yarn test-single-run", ".")
    if errorCode <> 0 then failwith "Javascript tests failed!"
)



//Code Created By IBS
let sourceDir = @"./src/"
let packingDir = @"./nugetPackages/"
let net45Dir = packingDir @@ "lib/net45/"
let outputDir =  packingDir @@ "NugetLibrary"

let CreateSlimPackage projectname projectfolder nuspecfile =  
    NuGet (fun p ->
     {p with
         Project = projectname
         Authors = ["Algomerchant"]
         Description = "This is "+projectname+" nuget package"         
         Version = version
         OutputPath = buildDir         
         ToolPath = nugetPath
         WorkingDir = projectfolder
         })
         nuspecfile
//TODO: change package name here
Target "CompileApp" (fun _ ->            
    CreateSlimPackage "JoeyWebClient" @"src\" @"src\\template.nuspec" 
)

// Create the release (without deployment yet) using OctoPack
Target "CreateRelease" (fun _->    
    let server = { Server = "https://octopus.algomerchant.com"; ApiKey = "API-QFM9YTWOAP7S0JZITQMWNJLRW" }    
    let octoToolsPath = packagesDir @@ "OctopusTools.2.6.1.52" 
    // TODO:change package name here
    let projects = ["JoeyWebClient"]

    for project in projects do
        NuGetPublish (fun p -> 
            { p with
                OutputPath = buildDir
                ToolPath = nugetPath
                Project = project
                Version = version
                PublishUrl = server.Server + @"/nuget/packages"
                AccessKey = server.ApiKey
            })
    
        let release = { releaseOptions with 
                            Project = project
                            Version = version
                            Packages = [project + ":" + version]
                            IgnoreExisting = true                                                
                             }
    
        Octo (fun octoParams ->
            { octoParams with
                ToolPath = octoToolsPath
                Server   = server
                Command  = CreateRelease (release, None) }
        )
    
)


// Dependencies

"RunGulp"
      =?> ("JSTest",runJSTest)
      ==> "Clean"
      ==> "RestorePackage"
      ==> "CompileApp"      
      ==> "CreateRelease"       


// start build
RunTargetOrDefault "CompileApp"
