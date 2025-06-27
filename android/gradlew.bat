@if "%DEBUG%" == "" @echo off
@rem
@rem Copyright © 2015-present Facebook, Inc.
@rem
@rem This source code is licensed under the MIT license found in the
@rem LICENSE file in the root directory of this source tree.
@rem

setlocal
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_ROOT=%DIRNAME%..
set GRADLE_CMD=%APP_ROOT%\gradlew.bat

if exist "%GRADLE_CMD%" (
  call "%GRADLE_CMD%" %*
) else (
  echo "Could not find gradlew.bat"
  exit /b 1
)
