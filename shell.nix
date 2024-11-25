{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = with pkgs; [ 
    nest-cli
    # nodejs
    nodejs_20
    # nodePackages.pnpm
    nodePackages_latest.pnpm
  ];
}
