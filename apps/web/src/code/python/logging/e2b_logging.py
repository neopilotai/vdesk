import logging
from os import getenv

from vdesk import Sandbox

VDESK_API_KEY = getenv("VDESK_API_KEY")

# Global logging configuration
logging.basicConfig(level=logging.INFO, format="GLOBAL - [%(asctime)s] - %(name)-32s - %(levelname)7s: %(message)s",
                    datefmt="%Y-%m-%d %H:%M:%S")  # $HighlightLine

# Or configure only vdesk logger

# Get vdesk logger
vdesk_logger = logging.getLogger("vdesk")  # $HighlightLine

# Set vdesk logger level to INFO
vdesk_logger.setLevel(logging.INFO)  # $HighlightLine

# Setup formatter
formatter = logging.Formatter("VDESK    - [%(asctime)s] - %(name)-32s - %(levelname)7s: %(message)s",
                              datefmt="%Y-%m-%d %H:%M:%S")

# Setup handler
handler = logging.StreamHandler()
handler.setFormatter(formatter)

# Add handler to vdesk logger
vdesk_logger.addHandler(handler)  # $HighlightLine


def main():
    sandbox = Sandbox(template="base", api_key=VDESK_API_KEY)
    sandbox.filesystem.write("test.txt", "Hello World")
    sandbox.close()


main()
