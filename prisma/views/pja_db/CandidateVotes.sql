SELECT
  `c`.`id` AS `id`,
  `c`.`name` AS `name`,
  `c`.`code` AS `code`,
  `c`.`jabatan` AS `jabatan`,
  `c`.`desa_kelurahan` AS `desa_kelurahan`,
  `c`.`kecamatan` AS `kecamatan`,
  `c`.`kabupaten_kota` AS `kabupaten_kota`,
  `c`.`provinsi` AS `provinsi`,
  `c`.`photo` AS `photo`,
  `v`.`votes` AS `votes`,
  `c`.`created_at` AS `created_at`
FROM
  (
    `pja_db`.`Candidates` `c`
    LEFT JOIN (
      SELECT
        `pja_db`.`Votes`.`candidate_id` AS `candidate_id`,
        count(1) AS `votes`
      FROM
        `pja_db`.`Votes`
      GROUP BY
        `pja_db`.`Votes`.`candidate_id`
    ) `v` ON(`c`.`id` = `v`.`candidate_id`)
  )
ORDER BY
  `v`.`votes` DESC,
  `c`.`provinsi`,
  `c`.`name`