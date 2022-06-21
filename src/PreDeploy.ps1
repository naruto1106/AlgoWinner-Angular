mv "$OctopusEnvironmentName.config" Web.config.foo
rm *.config

mv Web.config.foo Web.config

$source = "srcmap"
$destination = "ftp://anonymous@192.168.99.9"

$webclient = New-Object -TypeName System.Net.WebClient

$files = Get-ChildItem -Recurse $source

foreach ($file in $files)
{
        if ($file.Attributes -eq "Directory") {
            try {
                $path = $destination+"/srcmap/"+$file
                Write-Host "Creating" $path
                $makeDirectory = [System.Net.WebRequest]::Create($path);
                $makeDirectory.Method = [System.Net.WebRequestMethods+FTP]::MakeDirectory;
                $makeDirectory.GetResponse();
            } catch [Net.WebException] {
                Write-Host $file.Name probably exists
            }
        } else {
            $rel = Resolve-Path -Relative $file.FullName
            $rel = $rel.SubString(2)
            $path = "$destination/$rel"
            $path = $path.Replace("\","/")
            Write-Host "Uploading" $path
            $webclient.UploadFile("$path", $file.FullName)
        }
} 

$webclient.Dispose()