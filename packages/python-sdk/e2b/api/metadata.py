import platform

from importlib import metadata

package_version = metadata.version("vdesk")

default_headers = {
    "lang": "python",
    "lang_version": platform.python_version(),
    "package_version": metadata.version("vdesk"),
    "publisher": "vdesk",
    "sdk_runtime": "python",
    "system": platform.system(),
}
