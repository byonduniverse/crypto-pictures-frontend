import { create } from "ipfs-http-client";

export const ipfs = create({
  host: process.env.REACT_APP_IPFS_HOST || "ipfs.infura.io",
  port: parseInt(process.env.REACT_APP_IPFS_PORT || "5001"),
  protocol: process.env.REACT_APP_IPFS_PROTOCOL || "https"
});