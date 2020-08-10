// For some reason, just this file existing makes the build work.
// It seems like maybe microbundle-clr, or rollup, or some plugin
// uses the 'csstype' library. The --row-color variable was
// unknown to 'csstype' and causing a type error to be thrown.
//
// See: https://github.com/frenic/csstype/issues/63
//
// That code did exist in this file, but for some reason deleting
// it didn't seem to break anything. Shrug.
